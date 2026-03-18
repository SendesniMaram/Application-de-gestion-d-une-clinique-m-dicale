from flask import Blueprint, request, jsonify
from database import get_connection
from datetime import datetime

dossier_bp = Blueprint("dossiers", __name__)

@dossier_bp.route("", methods=["GET"])
def get_all_dossiers():
    """Récupère tous les dossiers médicaux ou ceux d'un patient spécifique."""
    conn = get_connection()
    cur = conn.cursor()
    patient_id = request.args.get("patient_id")
    if patient_id:
        # Récupération des dossiers filtrés par patient
        cur.execute("""
            SELECT d.*, p.nom || ' ' || p.prenom as patient_nom 
            FROM dossiers d
            JOIN patients p ON d.id_patient = p.id_patient
            WHERE d.id_patient=?
        """, (patient_id,))
    else:
        # Récupération de tous les dossiers avec le nom du patient associé
        cur.execute("""
            SELECT d.*, p.nom || ' ' || p.prenom as patient_nom 
            FROM dossiers d
            JOIN patients p ON d.id_patient = p.id_patient
        """)
        
    rows = cur.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@dossier_bp.route("", methods=["POST"])
def add_dossier():
    """Ajoute un nouveau dossier médical."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()
    
    # Validation des données
    from validators import validate_dossier
    # Assurer que 'patient_id' est bien présent pour le validateur
    # La colonne DB est 'id_patient', mais le validateur attend 'patient_id'
    val_data = data.copy()
    if "id_patient" in data:
        val_data["patient_id"] = data["id_patient"]
        
    errors = validate_dossier(val_data)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        cur.execute("""
            INSERT INTO dossiers (id_patient, observations, traitement, date_derniere_visite)
            VALUES (?,?,?,?)
        """, (
            data["id_patient"], 
            data["observations"],
            data["traitement"], 
            datetime.now().strftime("%Y-%m-%d")
        ))
        conn.commit()
        return jsonify({"message": "Dossier créé"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@dossier_bp.route("/<int:id_dossier>", methods=["PUT"])
def update_dossier(id_dossier):
    """Met à jour un dossier médical existant."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()

    # Validation
    from validators import validate_dossier
    val_data = data.copy()
    if "id_patient" in data:
        val_data["patient_id"] = data["id_patient"]
        
    errors = validate_dossier(val_data)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        # Mise à jour des informations et de la date de dernière visite
        cur.execute("""
            UPDATE dossiers 
            SET observations=?, traitement=?, date_derniere_visite=?
            WHERE id_dossier=?
        """, (
            data["observations"],
            data["traitement"],
            datetime.now().strftime("%Y-%m-%d"), 
            id_dossier
        ))
        conn.commit()
        return jsonify({"message": "Dossier mis à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@dossier_bp.route("/<int:id_dossier>", methods=["DELETE"])
def delete_dossier(id_dossier):
    """Supprime un dossier médical."""
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM dossiers WHERE id_dossier=?", (id_dossier,))
        conn.commit()
        return jsonify({"message": "Dossier supprimé"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
