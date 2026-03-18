from flask import Blueprint, request, jsonify
from database import get_connection

patient_bp = Blueprint("patients", __name__)

@patient_bp.route("", methods=["GET"])
def get_patients():
    """Récupère la liste de tous les patients."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM patients")
    rows = cur.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@patient_bp.route("", methods=["POST"])
def add_patient():
    """Ajoute un nouveau patient."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()
    
    # Validation via le module dédié
    from validators import validate_patient
    errors = validate_patient(data, is_update=False)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        from werkzeug.security import generate_password_hash
        hashed_pw = generate_password_hash(data["password"])
        cur.execute("""
            INSERT INTO patients (nom, prenom, age, adresse, telephone, antecedents, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data["nom"], 
            data["prenom"], 
            data["age"], 
            data["adresse"], 
            data["telephone"], 
            data.get("antecedents", ""), # Optionnel
            data["email"], 
            hashed_pw
        ))
        conn.commit()
        return jsonify({"message": "Patient ajouté avec succès"}), 201
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            return jsonify({"error": "Cet email est déjà utilisé par un autre patient."}), 409
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@patient_bp.route("/<int:id_patient>", methods=["PUT"])
def update_patient(id_patient):
    """Met à jour les informations d'un patient."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()

    # Validation
    from validators import validate_patient
    errors = validate_patient(data, is_update=True)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        # Vérifie si le mot de passe doit être mis à jour
        if data.get("password") and str(data["password"]).strip():
            from werkzeug.security import generate_password_hash
            hashed_pw = generate_password_hash(data["password"])
            cur.execute("""
                UPDATE patients 
                SET nom=?, prenom=?, age=?, adresse=?, telephone=?, antecedents=?, email=?, password=?
                WHERE id_patient=?
            """, (
                data["nom"], 
                data["prenom"], 
                data["age"], 
                data["adresse"], 
                data["telephone"], 
                data.get("antecedents", ""), 
                data["email"], 
                hashed_pw,
                id_patient
            ))
        else:
            cur.execute("""
                UPDATE patients 
                SET nom=?, prenom=?, age=?, adresse=?, telephone=?, antecedents=?, email=?
                WHERE id_patient=?
            """, (
                data["nom"], 
                data["prenom"], 
                data["age"], 
                data["adresse"], 
                data["telephone"], 
                data.get("antecedents", ""), 
                data["email"], 
                id_patient
            ))
        
        conn.commit()
        return jsonify({"message": "Patient modifié avec succès"}), 200
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            return jsonify({"error": "Cet email est déjà utilisé par un autre patient."}), 409
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@patient_bp.route("/<int:id_patient>", methods=["DELETE"])
def delete_patient(id_patient):
    """Supprime un patient et ses données associées (dossiers, rdv)."""
    conn = get_connection()
    cur = conn.cursor()
    try:
        # Suppression manuelle des enregistrements liés pour éviter les erreurs de contrainte de clé étrangère
        # (Si la suppression en cascade n'est pas activée sur la table actuelle)
        cur.execute("DELETE FROM dossiers WHERE id_patient=?", (id_patient,))
        cur.execute("DELETE FROM rendezvous WHERE id_patient=?", (id_patient,))
        
        cur.execute("DELETE FROM patients WHERE id_patient=?", (id_patient,))
        conn.commit()
        return jsonify({"message": "Patient supprimé"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
