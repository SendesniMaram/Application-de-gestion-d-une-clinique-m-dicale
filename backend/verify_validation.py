import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_add_patient_invalid():
    """Teste l'ajout d'un patient avec des données invalides (devrait échouer)."""
    print("Test Ajout Patient (Invalide)...", end=" ")
    data = {"nom": ""} # Manque les autres champs obligatoires
    try:
        res = requests.post(f"{BASE_URL}/patients", json=data)
        if res.status_code == 400 and "errors" in res.json():
            print("SUCCÈS")
            print("Erreurs retournées:", res.json()["errors"])
        else:
            print(f"ÉCHEC: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"ERREUR: {e}")

def test_add_medecin_invalid():
    """Teste l'ajout d'un médecin avec des données invalides (devrait échouer)."""
    print("\nTest Ajout Médecin (Invalide)...", end=" ")
    data = {"nom": "Dr House", "email": "invalid-email"} 
    try:
        res = requests.post(f"{BASE_URL}/medecins", json=data)
        if res.status_code == 400 and "errors" in res.json():
            print("SUCCÈS")
            print("Erreurs retournées:", res.json()["errors"])
        else:
            print(f"ÉCHEC: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"ERREUR: {e}")

if __name__ == "__main__":
    test_add_patient_invalid()
    test_add_medecin_invalid()
