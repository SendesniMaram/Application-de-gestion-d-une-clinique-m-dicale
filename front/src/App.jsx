import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Medecins from "./pages/Medecins";
import RendezVous from "./pages/RendezVous";
import DossierMedical from "./pages/DossierMedical";
import Rapports from "./pages/Rapports";
import Apropos from "./pages/apropos";
import Inscription from "./pages/Inscription";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PAGE PUBLIQUE */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/apropos" element={<Apropos />} />

                {/* PAGES INTERNES AVEC SIDEBAR */}
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/medecins" element={<Medecins />} />
                    <Route path="/rdv" element={<RendezVous />} />
                    <Route path="/dossier" element={<DossierMedical />} />
                    <Route path="/rapports" element={<Rapports />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
