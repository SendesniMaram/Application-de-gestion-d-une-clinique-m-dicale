import sqlite3
import random
import os
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "clinique.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def clear_data():
    conn = get_connection()
    cur = conn.cursor()
    # Optionnel : Décommenter pour effacer les données avant de remplir
    # cur.execute("DELETE FROM patients")
    # cur.execute("DELETE FROM medecins")
    # cur.execute("DELETE FROM rendezvous")
    # cur.execute("DELETE FROM dossiers")
    # conn.commit()
    conn.close()

def seed_medecins():
    medecins = [
        ("Dr. House", "Diagnostiqueur", "0123456789", "house@hopital.com", "password"),
        ("Dr. Strange", "Chirurgien", "0198765432", "strange@marvel.com", "password"),
        ("Dr. Quinn", "Généraliste", "0655443322", "quinn@test.com", "password"),
        ("Dr. Grey", "Chirurgien", "0788996655", "grey@seattle.com", "password"),
        ("Dr. Watson", "Généraliste", "0611223344", "watson@holmes.com", "password")
    ]
    
    conn = get_connection()
    cur = conn.cursor()
    count = 0
    for m in medecins:
        try:
            cur.execute("""
                INSERT INTO medecins (nom, specialite, telephone, email, password)
                VALUES (?, ?, ?, ?, ?)
            """, m)
            count += 1
        except sqlite3.IntegrityError:
            print(f"Medecin {m[3]} existe déjà.")
    
    conn.commit()
    conn.close()
    print(f"{count} médecins ajoutés.")

def seed_patients():
    first_names = ["Jean", "Marie", "Pierre", "Sophie", "Lucas", "Julie", "Thomas", "Emma"]
    last_names = ["Dupont", "Martin", "Durand", "Leroy", "Moreau", "Simon", "Laurent", "Michel"]
    
    conn = get_connection()
    cur = conn.cursor()
    count = 0
    
    for i in range(20):
        nom = random.choice(last_names)
        prenom = random.choice(first_names)
        email = f"{prenom.lower()}.{nom.lower()}{i}@example.com"
        age = random.randint(18, 90)
        telephone = f"06{random.randint(10000000, 99999999)}"
        adresse = f"{random.randint(1, 100)} Rue de la Santé"
        password = "password123"
        antecedents = random.choice(["Aucun", "Diabète", "Hypertension", "Asthme", "Allergie Pénicilline"])

        try:
            cur.execute("""
                INSERT INTO patients (nom, prenom, age, adresse, telephone, antecedents, email, password)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (nom, prenom, age, adresse, telephone, antecedents, email, password))
            count += 1
        except sqlite3.IntegrityError:
            pass # Ignorer les doublons

    conn.commit()
    conn.close()
    print(f"{count} patients ajoutés.")

def seed_rdvs():
    conn = get_connection()
    cur = conn.cursor()
    
    # Get IDs
    cur.execute("SELECT id_patient FROM patients")
    patient_ids = [row[0] for row in cur.fetchall()]
    
    cur.execute("SELECT id_medecin FROM medecins")
    medecin_ids = [row[0] for row in cur.fetchall()]
    
    if not patient_ids or not medecin_ids:
        print("Il faut des patients et des médecins pour créer des RDV.")
        return

    count = 0
    motifs = ["Consultation de routine", "Grippe", "Douleur dos", "Suivi post-op", "Renouvellement ordonnance"]
    
    for _ in range(30):
        p_id = random.choice(patient_ids)
        m_id = random.choice(medecin_ids)
        
        # Date aléatoire dans +/- 30 jours
        days_offset = random.randint(-30, 30)
        date_rdv = (datetime.now() + timedelta(days=days_offset)).strftime("%Y-%m-%d")
        heure_rdv = f"{random.randint(8, 18)}:00"
        motif = random.choice(motifs)

        cur.execute("""
            INSERT INTO rendezvous (id_patient, id_medecin, date_rdv, heure_rdv, motif)
            VALUES (?, ?, ?, ?, ?)
        """, (p_id, m_id, date_rdv, heure_rdv, motif))
        count += 1

    conn.commit()
    conn.close()
    print(f"{count} rendez-vous ajoutés.")

if __name__ == "__main__":
    print("Début du remplissage de la base...")
    seed_medecins()
    seed_patients()
    seed_rdvs()
    print("Terminé.")
