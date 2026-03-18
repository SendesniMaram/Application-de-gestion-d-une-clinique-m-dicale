import sqlite3
import os

# S'assurer que la base de données est toujours trouvée dans le répertoire backend, 
# peu importe d'où le script est exécuté
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, "clinique.db")

def get_connection():
    """Établit et retourne une connexion à la base de données SQLite."""
    conn = sqlite3.connect(DB_NAME)
    # Permet d'accéder aux colonnes par nom (ex: row['nom'])
    conn.row_factory = sqlite3.Row
    # Activer le support des clés étrangères (Foreign Keys) dans SQLite (désactivé par défaut)
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def init_db():
    """Initialise la base de données avec les tables nécessaires."""
    conn = get_connection()
    cur = conn.cursor()

    # Table Patient (Schéma strict + identifiants de connexion)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS patients (
        id_patient INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        prenom TEXT,
        age INTEGER,
        adresse TEXT,
        telephone TEXT,
        antecedents TEXT,
        email TEXT UNIQUE,
        password TEXT,
        date_inscription TEXT DEFAULT CURRENT_DATE
    )
    """)

    # Table Médecin (Schéma strict + identifiants de connexion)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS medecins (
        id_medecin INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        specialite TEXT,
        telephone TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    # Table RendezVous (Schéma strict + Suppression en cascade)
    # Si un patient ou un médecin est supprimé, ses rendez-vous le sont aussi
    cur.execute("""
    CREATE TABLE IF NOT EXISTS rendezvous (
        id_rdv INTEGER PRIMARY KEY AUTOINCREMENT,
        id_patient INTEGER,
        id_medecin INTEGER,
        date_rdv TEXT,
        heure_rdv TEXT,
        motif TEXT,
        FOREIGN KEY(id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE,
        FOREIGN KEY(id_medecin) REFERENCES medecins(id_medecin) ON DELETE CASCADE
    )
    """)

    # Table DossierMédical (Schéma strict + Suppression en cascade)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS dossiers (
        id_dossier INTEGER PRIMARY KEY AUTOINCREMENT,
        id_patient INTEGER,
        observations TEXT,
        traitement TEXT,
        date_derniere_visite TEXT,
        FOREIGN KEY(id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE
    )
    """)

    # Table Admins (Existante)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    """)

    # Création d'un administrateur par défaut avec mot de passe haché
    from werkzeug.security import generate_password_hash
    hashed_pw = generate_password_hash("admin123")
    cur.execute("INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)", ("admin", hashed_pw))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Base de données mise à jour avec contraintes ForeignKey")
