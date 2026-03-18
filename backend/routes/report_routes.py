from flask import Blueprint, jsonify, Response
from database import get_connection
import csv
import io

report_bp = Blueprint("reports", __name__)

@report_bp.route("/stats", methods=["GET"])
def get_global_stats():
    """Récupère les statistiques globales de la clinique pour le tableau de bord."""
    conn = get_connection()
    cur = conn.cursor()
    
    # Comptages globaux
    cur.execute("SELECT COUNT(*) FROM patients")
    nb_patients = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM medecins")
    nb_medecins = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM rendezvous")
    nb_rdvs = cur.fetchone()[0]

    # Statistiques du jour
    from datetime import date
    today = date.today().isoformat() # format AAAA-MM-JJ

    cur.execute("SELECT COUNT(*) FROM rendezvous WHERE date_rdv = ?", (today,))
    rdvs_today = cur.fetchone()[0]

    # Tentative de récupération des nouveaux patients si la colonne existe
    try:
        cur.execute("SELECT COUNT(*) FROM patients WHERE date_inscription = ?", (today,))
        new_patients_today = cur.fetchone()[0]
    except:
        new_patients_today = 0

    # Médecins disponibles (Estimation simple)
    # On compte les médecins qui n'ont PAS de RDV aujourd'hui
    cur.execute("""
        SELECT COUNT(*) FROM medecins 
        WHERE id_medecin NOT IN (
            SELECT DISTINCT id_medecin FROM rendezvous WHERE date_rdv = ?
        )
    """, (today,))
    available_doctors = cur.fetchone()[0]

    # Top des Spécialités
    cur.execute("""
        SELECT m.specialite, COUNT(r.id_rdv) as count 
        FROM medecins m 
        LEFT JOIN rendezvous r ON m.id_medecin = r.id_medecin 
        GROUP BY m.specialite 
        ORDER BY count DESC
    """)
    top_specialites = [dict(row) for row in cur.fetchall()]

    conn.close()

    return jsonify({
        "nb_patients": nb_patients,
        "nb_medecins": nb_medecins,
        "nb_rdvs": nb_rdvs,
        "rdvs_today": rdvs_today,
        "new_patients_today": new_patients_today,
        "available_doctors": available_doctors,
        "top_specialites": top_specialites
    })

@report_bp.route("/export/csv", methods=["GET"])
def export_csv_stats():
    """Génère un fichier CSV contenant les statistiques globales."""
    conn = get_connection()
    cur = conn.cursor()
    
    # Récupération des données pour le CSV
    cur.execute("SELECT COUNT(*) FROM patients")
    nb_patients = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM medecins")
    nb_medecins = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM rendezvous")
    nb_rdvs = cur.fetchone()[0]

    cur.execute("""
        SELECT m.specialite, COUNT(r.id_rdv) as count 
        FROM medecins m 
        LEFT JOIN rendezvous r ON m.id_medecin = r.id_medecin 
        GROUP BY m.specialite 
        ORDER BY count DESC
    """)
    top_specialites = cur.fetchall()
    
    conn.close()

    # Génération du CSV en mémoire
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(["Rapport Global de la Clinique"])
    writer.writerow([])
    writer.writerow(["Statistiques Generales"])
    writer.writerow(["Nombre de Patients", nb_patients])
    writer.writerow(["Nombre de Meedcins", nb_medecins])
    writer.writerow(["Nombre de Rendez-vous", nb_rdvs])
    writer.writerow([])
    writer.writerow(["Specialites les plus sollicitees"])
    writer.writerow(["Specialite", "Nombre de RDV"])
    
    for row in top_specialites:
        writer.writerow([row[0], row[1]])

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=rapport_clinique.csv"}
    )

@report_bp.route("/export/pdf", methods=["GET"])
def export_pdf_stats():
    """Génère un fichier PDF contenant les statistiques globales."""
    from fpdf import FPDF
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("SELECT COUNT(*) FROM patients")
    nb_patients = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM medecins")
    nb_medecins = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM rendezvous")
    nb_rdvs = cur.fetchone()[0]

    cur.execute("""
        SELECT m.specialite, COUNT(r.id_rdv) as count 
        FROM medecins m 
        LEFT JOIN rendezvous r ON m.id_medecin = r.id_medecin 
        GROUP BY m.specialite 
        ORDER BY count DESC
    """)
    top_specialites = cur.fetchall()
    conn.close()

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(0, 10, "Rapport Global de la Clinique MediCare", ln=True, align='C')
    pdf.ln(10)

    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 10, "Statistiques Générales", ln=True)
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 10, f"Nombre de Patients: {nb_patients}", ln=True)
    pdf.cell(0, 10, f"Nombre de Médecins: {nb_medecins}", ln=True)
    pdf.cell(0, 10, f"Nombre de Rendez-vous: {nb_rdvs}", ln=True)
    pdf.ln(10)

    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 10, "Spécialités les plus sollicitées", ln=True)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(100, 10, "Spécialité", border=1)
    pdf.cell(40, 10, "Nombre de RDV", border=1, ln=True)
    
    pdf.set_font("Helvetica", "", 11)
    for row in top_specialites:
        pdf.cell(100, 10, str(row[0]), border=1)
        pdf.cell(40, 10, str(row[1]), border=1, ln=True)

    # Retourner comme réponse
    return Response(
        pdf.output(),
        mimetype="application/pdf",
        headers={"Content-disposition": "attachment; filename=rapport_clinique.pdf"}
    )
