from flask import Blueprint, request, jsonify
from database import get_connection

# Création du Blueprint pour les routes d'authentification
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Gère la connexion des utilisateurs (Admin, Patient, Médecin).
    Attend un JSON avec 'email' (ou 'username') et 'password'.
    """
    data = request.json
    # On accepte 'email' ou 'username' pour être souple, mais le front envoie 'email' 
    identifier = data.get("email") or data.get("username")
    password = data.get("password")
    role = data.get("role", "admin") # Rôle par défaut : admin

    if not identifier or not password:
         return jsonify({"error": "Email/Username et mot de passe requis"}), 400

    conn = get_connection()
    cur = conn.cursor()
    user = None

    if role == "admin":
        # Vérification insensible à la casse pour le nom d'utilisateur admin
        cur.execute("SELECT * FROM admins WHERE LOWER(username)=LOWER(?)", (identifier,))
        user = cur.fetchone()
    elif role == "patient":
        cur.execute("SELECT * FROM patients WHERE email=?", (identifier,))
        user = cur.fetchone()
    elif role == "medical": # Le front utilise "medical" pour désigner un médecin
        cur.execute("SELECT * FROM medecins WHERE email=?", (identifier,))
        user = cur.fetchone()
    
    conn.close()

    from werkzeug.security import check_password_hash
    if user:
        user_dict = dict(user)
        # Vérification du mot de passe haché
        if check_password_hash(user_dict["password"], password):
            # On renvoie le rôle pour que le frontend puisse rediriger vers la bonne page
            user_dict["role"] = role 
            # Suppression du mot de passe de la réponse pour la sécurité
            del user_dict["password"]
            return jsonify({"message": "Connexion réussie", "user": user_dict})
    
    return jsonify({"error": "Identifiants incorrects"}), 401
