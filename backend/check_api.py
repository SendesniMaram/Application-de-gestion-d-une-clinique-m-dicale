import requests

def check_endpoints():
    """Vérifie si les principaux endpoints de l'API répondent correctement."""
    endpoints = [
        "http://localhost:5000/api/patients",
        "http://localhost:5000/api/medecins"
    ]
    
    for url in endpoints:
        try:
            print(f"Vérification de {url}...", end=" ")
            res = requests.get(url)
            if res.status_code == 200:
                data = res.json()
                print(f"OK ({len(data)} éléments)")
                if len(data) > 0:
                    print(f"Exemple : {data[0]}")
            else:
                print(f"ÉCHEC : {res.status_code}")
        except Exception as e:
            print(f"ERREUR : {e}")

if __name__ == "__main__":
    check_endpoints()
