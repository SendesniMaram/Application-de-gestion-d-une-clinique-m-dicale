@echo off
echo Lancement du projet MediCare...

echo Demarrage du Backend...
start "MediCare Backend" cmd /k "cd backend && .\venv\Scripts\activate && python app.py"

echo Demarrage du Frontend...
start "MediCare Frontend" cmd /k "cd front && npm run dev"

echo.
echo Les deux serveurs sont en cours de lancement.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
