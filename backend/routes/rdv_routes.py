from flask import Blueprint, request, jsonify
from database import get_connection

rdv_bp = Blueprint("rdv", __name__)

@rdv_bp.route("", methods=["GET"])
def get_rdvs():
    """
    Récupère la liste des rendez-vous.
    Permet de filtrer par date ou par patient via les paramètres d'URL.
    """
    # Filtres optionnels
    date_filter = request.args.get("date")
    patient_filter = request.args.get("id_patient")

    query = """
        SELECT r.*, 
               p.nom as patient_nom, p.prenom as patient_prenom, 
               m.nom as medecin_nom, m.specialite as medecin_specialite
        FROM rendezvous r
        JOIN patients p ON r.id_patient = p.id_patient
        JOIN medecins m ON r.id_medecin = m.id_medecin
        WHERE 1=1
    """
    params = []

    if date_filter:
        query += " AND r.date_rdv = ?"
        params.append(date_filter)
    
    if patient_filter:
        query += " AND r.id_patient = ?"
        params.append(patient_filter)

    query += " ORDER BY r.date_rdv DESC, r.heure_rdv ASC"

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(query, params)
    rows = cur.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@rdv_bp.route("", methods=["POST"])
def add_rdv():
    """Ajoute un nouveau rendez-vous après avoir vérifié la disponibilité."""
    data = request.json
    conn = get_connection()
    cur = conn.cursor()

    # Vérification des champs requis
    required = ["id_patient", "id_medecin", "date_rdv", "heure_rdv", "motif"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Champ manquant: {field}"}), 400

    # Vérifier conflit : Est-ce que ce médecin a déjà un RDV à cette date et heure ?
    cur.execute("""
        SELECT * FROM rendezvous
        WHERE id_medecin=? AND date_rdv=? AND heure_rdv=?
    """, (data["id_medecin"], data["date_rdv"], data["heure_rdv"]))

    if cur.fetchone():
        conn.close()
        return jsonify({"error": "Ce médecin est déjà occupé à cet horaire."}), 409

    try:
        cur.execute("""
            INSERT INTO rendezvous (id_patient, id_medecin, date_rdv, heure_rdv, motif)
            VALUES (?,?,?,?,?)
        """, (
            data["id_patient"], data["id_medecin"],
            data["date_rdv"], data["heure_rdv"], data["motif"]
        ))
        conn.commit()
        conn.close()
        return jsonify({"message": "Rendez-vous ajouté avec succès"}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@rdv_bp.route("/<int:id_rdv>", methods=["DELETE"])
def delete_rdv(id_rdv):
    """Supprime un rendez-vous."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM rendezvous WHERE id_rdv=?", (id_rdv,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Rendez-vous supprimé"})
