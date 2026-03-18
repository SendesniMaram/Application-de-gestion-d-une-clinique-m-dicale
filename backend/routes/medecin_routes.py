from flask import Blueprint, request, jsonify
from database import get_connection

medecin_bp = Blueprint("medecins", __name__)

@medecin_bp.route("", methods=["GET"])
def get_medecins():
    """Récupère la liste de tous les médecins."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM medecins")
    rows = cur.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@medecin_bp.route("", methods=["POST"])
def add_medecin():
    """Ajoute un nouveau médecin."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()

    # Validation des données
    from validators import validate_medecin
    errors = validate_medecin(data, is_update=False)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        from werkzeug.security import generate_password_hash
        hashed_pw = generate_password_hash(data["password"])
        cur.execute("""
            INSERT INTO medecins (nom, specialite, telephone, email, password) 
            VALUES (?, ?, ?, ?, ?)
        """, (
            data["nom"], 
            data["specialite"], 
            data["telephone"],
            data["email"],
            hashed_pw
        ))
        conn.commit()
        return jsonify({"message": "Médecin ajouté avec succès"}), 201
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            return jsonify({"error": "Cet email est déjà utilisé par un autre médecin."}), 409
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@medecin_bp.route("/<int:id_medecin>", methods=["PUT"])
def update_medecin(id_medecin):
    """Met à jour les informations d'un médecin."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()

    from validators import validate_medecin
    errors = validate_medecin(data, is_update=True)
    if errors:
         return jsonify({"errors": errors}), 400

    try:
        # Si un nouveau mot de passe est fourni, on le hache et on met à jour
        if data.get("password") and str(data["password"]).strip():
            from werkzeug.security import generate_password_hash
            hashed_pw = generate_password_hash(data["password"])
            cur.execute("""
                UPDATE medecins 
                SET nom=?, specialite=?, telephone=?, email=?, password=?
                WHERE id_medecin=?
            """, (
                data["nom"], 
                data["specialite"], 
                data["telephone"],
                data["email"],
                hashed_pw,
                id_medecin
            ))
        else:
            # Sinon on met à jour les autres champs sans toucher au mot de passe
            cur.execute("""
                UPDATE medecins 
                SET nom=?, specialite=?, telephone=?, email=?
                WHERE id_medecin=?
            """, (
                data["nom"], 
                data["specialite"], 
                data["telephone"],
                data["email"],
                id_medecin
            ))
            
        conn.commit()
        return jsonify({"message": "Médecin mis à jour"}), 200
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            return jsonify({"error": "Cet email est déjà utilisé par un autre médecin."}), 409
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@medecin_bp.route("/<int:id_medecin>", methods=["DELETE"])
def delete_medecin(id_medecin):
    """Supprime un médecin et ses rendez-vous associés."""
    conn = get_connection()
    cur = conn.cursor()
    try:
        # Suppression manuelle des enregistrements liés (rendez-vous) avant de supprimer le médecin
        cur.execute("DELETE FROM rendezvous WHERE id_medecin=?", (id_medecin,))

        cur.execute("DELETE FROM medecins WHERE id_medecin=?", (id_medecin,))
        conn.commit()
        return jsonify({"message": "Médecin supprimé"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
