import { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Modal, Paper } from "@mui/material";
import DossierTable from "../components/DossierTable";
import DossierForm from "../components/DossierForm";
import { getDossiers, addDossier, updateDossier, deleteDossier } from "../services/dossierService";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

import { useLocation } from "react-router-dom";

export default function DossierMedical() {
  const [dossiers, setDossiers] = useState([]);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const patientId = params.get("patient_id");
    loadDossiers(patientId);
  }, [location]);

  const loadDossiers = async (patientId = null) => {
    try {
      const data = await getDossiers(patientId);
      setDossiers(data);
      // Pre-fill modal if we are in "single patient" mode? No, new dossier requires patient selection unless we previsit.
    } catch (e) {
      console.error("Failed to load dossiers", e);
    }
  };

  const handleOpen = (dossier = null) => {
    setSelectedDossier(dossier);
    setValidationErrors({});
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedDossier(null);
  };

  const handleAdd = async (dossier) => {
    try {
      await addDossier(dossier);
      loadDossiers();
      handleClose();
      return true;
    } catch (error) {
      if (error.errors) {
        setValidationErrors(error.errors);
      }
      return false;
    }
  };

  const handleUpdate = async (dossier) => {
    try {
      await updateDossier(dossier);
      loadDossiers();
      handleClose();
      return true;
    } catch (error) {
      if (error.errors) {
        setValidationErrors(error.errors);
      }
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?")) {
      await deleteDossier(id);
      loadDossiers();
    }
  };

  const filteredDossiers = Array.isArray(dossiers) ? dossiers.filter((d) => {
    if (!d) return false;
    const s = (search || "").toLowerCase();
    const nom = (d.patient_nom || "").toLowerCase();
    const id = (d.id_patient || "").toString();
    const dossierId = (d.id_dossier || "").toString();
    return nom.includes(s) || id.includes(s) || dossierId.includes(s);
  }) : [];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {new URLSearchParams(location.search).get("patient_id") ? "Historique Médical du Patient" : "Tous les Dossiers Médicaux"}
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          {new URLSearchParams(location.search).get("patient_id") ? "Nouvelle Visite/Observation" : "Nouveau Dossier"}
        </Button>
      </Box>

      <TextField
        label="Rechercher par patient ou ID"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DossierTable
        dossiers={filteredDossiers}
        onEdit={handleOpen}
        onDelete={handleDelete}
      />

      <Modal open={openModal} onClose={handleClose}>
        <Paper sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedDossier ? "Modifier le Dossier" : "Créer un Dossier"}
          </Typography>
          <DossierForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            selectedDossier={selectedDossier}
            errors={validationErrors}
            setErrors={setValidationErrors}
            initialPatientId={new URLSearchParams(location.search).get("patient_id")}
          />
        </Paper>
      </Modal>
    </Box>
  );
}
