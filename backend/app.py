from flask import Flask, jsonify
from flask_cors import CORS
from database import init_db

# Importation des Blueprints (modules de routes)
from routes.patient_routes import patient_bp
from routes.medecin_routes import medecin_bp
from routes.rdv_routes import rdv_bp
from routes.dossier_routes import dossier_bp
from routes.auth_routes import auth_bp
from routes.report_routes import report_bp

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration de CORS pour autoriser uniquement les requêtes venant du frontend React (localhost:5173)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Initialisation de la base de données au démarrage de l'app
init_db()

# Enregistrement des Blueprints avec leurs préfixes d'URL respectifs
app.register_blueprint(patient_bp, url_prefix="/api/patients")
app.register_blueprint(medecin_bp, url_prefix="/api/medecins")
app.register_blueprint(rdv_bp, url_prefix="/api/rdvs")
app.register_blueprint(dossier_bp, url_prefix="/api/dossiers")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(report_bp, url_prefix="/api/reports")

# Route de test pour vérifier que l'API tourne bien
@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "API Clinique fonctionne"
    })

# Point d'entrée principal pour lancer le serveur Flask
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)