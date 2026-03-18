import re

def validate_email(email):
    """Valide le format d'une adresse email avec une expression régulière."""
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Valide que le numéro de téléphone contient exactement 8 chiffres."""
    pattern = r"^\d{8}$"
    return re.match(pattern, phone) is not None

def validate_patient(data, is_update=False):
    """
    Valide les données d'un patient.
    :param data: Dictionnaire contenant les données du patient.
    :param is_update: Si True, le mot de passe n'est pas obligatoire (cas de mise à jour).
    :return: Dictionnaire des erreurs trouvées (vide si aucune erreur).
    """
    errors = {}
    
    required_fields = ["nom", "prenom", "age", "adresse", "telephone", "email"]
    if not is_update:
        required_fields.append("password")
    
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            errors[field] = "Ce champ est obligatoire."

    if "email" in data and data["email"] and not validate_email(data["email"]):
        errors["email"] = "Format d'email invalide."

    if "telephone" in data and data["telephone"] and not validate_phone(data["telephone"]):
        errors["telephone"] = "Format de téléphone invalide."
        
    if "age" in data:
        try:
            age = int(data["age"])
            if age < 0 or age > 150:
                 errors["age"] = "L'âge doit être compris entre 0 et 150."
        except ValueError:
            errors["age"] = "L'âge doit être un nombre entier."

    return errors

def validate_medecin(data, is_update=False):
    """
    Valide les données d'un médecin.
    :param data: Dictionnaire contenant les données du médecin.
    :param is_update: Si True, le mot de passe n'est pas obligatoire.
    :return: Dictionnaire des erreurs.
    """
    errors = {}
    
    required_fields = ["nom", "specialite", "telephone", "email"]
    if not is_update:
        required_fields.append("password")

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            errors[field] = "Ce champ est obligatoire."

    if "email" in data and data["email"] and not validate_email(data["email"]):
        errors["email"] = "Format d'email invalide."

    if "telephone" in data and data["telephone"] and not validate_phone(data["telephone"]):
        errors["telephone"] = "Format de téléphone invalide."

    return errors

def validate_dossier(data):
    """
    Valide les données d'un dossier médical.
    :param data: Données du dossier.
    :return: Dictionnaire des erreurs.
    """
    errors = {}
    
    # 'patient_id' est obligatoire pour lier le dossier, mais peut venir de l'URL ou d'une sélection
    if "patient_id" not in data or not data["patient_id"]:
        errors["patient_id"] = "Veuillez sélectionner un patient."

    if "observations" not in data or not str(data["observations"]).strip():
        errors["observations"] = "Les observations sont requises."
    
    if "traitement" not in data or not str(data["traitement"]).strip():
        errors["traitement"] = "Le traitement est requis."

    return errors
