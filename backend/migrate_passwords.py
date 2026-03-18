import sqlite3
import os
from werkzeug.security import generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, "clinique.db")

def migrate():
    """Fonction pour migrer les mots de passe en clair vers un format haché."""
    if not os.path.exists(DB_NAME):
        print(f"Erreur : Base de données {DB_NAME} introuvable")
        return

    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    print("Démarrage de la migration des mots de passe vers le format haché...")

    def process_table(table, id_col):
        """Traite une table spécifique pour hacher les mots de passe."""
        print(f"Traitement de {table}...")
        cur.execute(f"SELECT {id_col}, password FROM {table}")
        rows = cur.fetchall()
        count = 0
        for row in rows:
            id_val, pw = row
            # Si le mot de passe est déjà haché (commence par pbkdf2 ou scrypt), on ignore
            if pw and (pw.startswith("pbkdf2:sha256:") or pw.startswith("scrypt:")):
                continue
            
            # Hachage du mot de passe
            hashed_pw = generate_password_hash(pw)
            cur.execute(f"UPDATE {table} SET password=? WHERE {id_col}=?", (hashed_pw, id_val))
            count += 1
        print(f"{count} enregistrements mis à jour dans {table}")

    process_table("patients", "id_patient")
    process_table("medecins", "id_medecin")
    process_table("admins", "id")

    conn.commit()
    conn.close()
    print("Migration terminée !")

if __name__ == "__main__":
    migrate()
