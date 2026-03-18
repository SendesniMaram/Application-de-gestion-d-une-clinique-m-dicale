import sqlite3
import os
import requests

# La base de données est dans le même dossier que ce script
DB_PATH = os.path.join(os.path.dirname(__file__), "clinique.db")
print(f"Vérification de la BD à : {DB_PATH}")

def check_admins():
    """Vérifie s'il existe des administrateurs dans la base de données."""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM admins")
        rows = cur.fetchall()
        print(f"Admins trouvés : {len(rows)}")
        for row in rows:
            print(f"ID: {row[0]}, Username: {row[1]}, Password: {row[2]}")
            
        if len(rows) == 0:
            print("Aucun admin trouvé ! Insertion d'un admin par défaut...")
            cur.execute("INSERT INTO admins (username, password) VALUES (?, ?)", ("admin", "admin123"))
            conn.commit()
            print("Admin inséré.")
        
    except Exception as e:
        print(f"Erreur de lecture de la BD : {e}")
    finally:
        conn.close()

def test_login():
    """Teste la connexion avec l'utilisateur admin via l'API."""
    url = "http://localhost:5000/api/auth/login"
    payload = {"username": "admin", "password": "admin123", "role": "admin"}
    try:
        print(f"\nTest de connexion vers {url} avec {payload}...")
        res = requests.post(url, json=payload)
        print(f"Code Statut : {res.status_code}")
        print(f"Réponse : {res.text}")
    except Exception as e:
        print(f"Échec du test de connexion : {e}")

if __name__ == "__main__":
    check_admins()
    test_login()
