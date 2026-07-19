🏥 MediCare - Application de Gestion de Clinique Médicale
📖 Description

MediCare est une application web full-stack développée dans le cadre d'un projet universitaire. Elle permet de gérer les principales activités d'une clinique médicale, notamment la gestion des patients, des médecins, des rendez-vous et des dossiers médicaux.

L'application est composée d'un frontend développé avec React.js et d'un backend développé avec Flask (Python), communiquant via une API REST et utilisant SQLite comme base de données.

🚀 Fonctionnalités
Gestion des patients
Ajouter un patient
Modifier les informations d'un patient
Supprimer un patient
Consulter la liste des patients
Rechercher un patient
Gestion des médecins
Ajouter un médecin
Modifier un médecin
Supprimer un médecin
Consulter la liste des médecins
Gestion des rendez-vous
Créer un rendez-vous
Modifier un rendez-vous
Annuler un rendez-vous
Vérification des conflits de planning
Gestion des dossiers médicaux
Création des dossiers médicaux
Consultation des dossiers
Mise à jour des informations médicales
Tableau de bord
Nombre total de patients
Nombre de médecins
Nombre de rendez-vous
Statistiques générales
🛠️ Technologies utilisées
Frontend
React.js
Vite
Material UI (MUI)
React Router
Axios
Recharts
Backend
Python
Flask
Flask-CORS
Base de données
SQLite
Outils
Visual Studio Code
Postman
DB Browser for SQLite
Git
GitHub
📂 Structure du projet
MediCare/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   ├── patient_routes.py
│   │   ├── medecin_routes.py
│   │   ├── rdv_routes.py
│   │   ├── dossier_routes.py
│   │   └── report_routes.py
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   └── clinique.db
│
└── README.md
⚙️ Installation
1. Cloner le projet
git clone https://github.com/votre-utilisateur/MediCare.git
2. Backend

Accéder au dossier backend

cd backend

Créer un environnement virtuel

python -m venv venv

Activer l'environnement

Windows
venv\Scripts\activate
Linux / macOS
source venv/bin/activate

Installer les dépendances

pip install -r requirements.txt

Lancer le serveur Flask

python app.py

Le backend démarre sur :

http://localhost:5000
3. Frontend

Accéder au dossier frontend

cd frontend

Installer les dépendances

npm install

Lancer le projet

npm run dev

Le frontend est disponible sur :

http://localhost:5173
📊 Architecture
Utilisateur
      │
      ▼
React.js (Frontend)
      │
      ▼
API REST
      │
      ▼
Flask (Backend)
      │
      ▼
SQLite
📷 Captures d'écran

Vous pouvez ajouter ici des captures d'écran de l'application :

Tableau de bord
Gestion des patients
Gestion des médecins
Gestion des rendez-vous
Dossiers médicaux
Statistiques

Exemple :

docs/dashboard.png
docs/patients.png
docs/appointments.png
🎯 Objectifs du projet
Développer une application web full-stack.
Concevoir une architecture client/serveur.
Manipuler une API REST.
Gérer une base de données SQLite.
Mettre en pratique React et Flask.
Appliquer les principes du développement web moderne.
🔒 Fonctionnalités futures
Authentification sécurisée (JWT)
Gestion des rôles (Administrateur, Médecin, Secrétaire)
Notifications par e-mail
Export PDF des dossiers médicaux
Tableau de bord avancé
Déploiement sur le cloud
👩‍💻 Auteur

Maram Sendesni

Étudiante en ingénierie informatique

📄 Licence

Ce projet est réalisé dans un cadre académique et est destiné à des fins d'apprentissage et de démonstration.
