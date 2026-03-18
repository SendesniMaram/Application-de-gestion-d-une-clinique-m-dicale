import { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Modal, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientTable from "../components/PatientTable";
import PatientForm from "../components/PatientForm";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatients();
      setPatients(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load patients", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (patient = null) => {
    setSelectedPatient(patient);
    setValidationErrors({});
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedPatient(null);
  };

  const handleAdd = async (patient) => {
    try {
      await addPatient(patient);
      loadPatients();
      handleClose();
      return true;
    } catch (error) {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.errors) { // Handle fetch-style errors
        setValidationErrors(error.errors);
      } else {
        alert("Erreur lors de l'ajout.");
      }
      return false;
    }
  };

  const handleUpdate = async (patient) => {
    try {
      await updatePatient(patient);
      loadPatients();
      handleClose();
      return true;
    } catch (error) {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.errors) { // Handle fetch-style errors
        setValidationErrors(error.errors);
      } else {
        alert("Erreur lors de la modification.");
      }
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce patient ?")) {
      try {
        await deletePatient(id);
        loadPatients();
      } catch (e) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const handleViewHistory = (id) => {
    navigate(`/dossier?patient_id=${id}`);
  };

  const filteredPatients = patients.filter((p) => {
    const s = search.toLowerCase();
    return (p.nom || "").toLowerCase().includes(s) || (p.id_patient || "").toString().includes(s);
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Gestion des Patients
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Nouveau Patient</Button>
      </Box>

      <TextField
        label="Rechercher par nom ou ID"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <PatientTable
        patients={filteredPatients}
        onEdit={handleOpen}
        onDelete={handleDelete}
        onViewHistory={handleViewHistory}
      />

      {loading && <CircularProgress sx={{ display: 'block', m: '20px auto' }} />}

      <Modal open={openModal} onClose={handleClose}>
        <Paper sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            {selectedPatient ? "Modifier Patient" : "Ajouter Patient"}
          </Typography>
          <PatientForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            selectedPatient={selectedPatient}
            errors={validationErrors}
            setErrors={setValidationErrors}
            onCancel={handleClose}
          />
        </Paper>
      </Modal>
    </Box>
  );
}
