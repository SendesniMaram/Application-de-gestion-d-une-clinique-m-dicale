from database import get_connection

def migrate():
    """Exécute les migrations de schéma de base de données (ex: ajout de colonnes)."""
    conn = get_connection()
    cur = conn.cursor()
    
    try:
        # Ajout d'une colonne date_inscription à la table patients
        cur.execute("ALTER TABLE patients ADD COLUMN date_inscription TEXT DEFAULT CURRENT_DATE")
        conn.commit()
        print("Migration réussie : colonne date_inscription ajoutée.")
    except Exception as e:
        print(f"Erreur ou colonne déjà existante : {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
