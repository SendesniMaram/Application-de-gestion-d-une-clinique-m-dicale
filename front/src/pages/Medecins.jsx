import { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Modal, Paper, CircularProgress } from "@mui/material";
import MedecinForm from "../components/MedecinForm";
import MedecinTable from "../components/MedecinTable";
import {
  getMedecins,
  addMedecin,
  updateMedecin,
  deleteMedecin,
} from "../services/medecinService";

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

export default function Medecins() {
  const [medecins, setMedecins] = useState([]);
  const [selectedMedecin, setSelectedMedecin] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMedecins();
  }, []);

  const loadMedecins = async () => {
    setLoading(true);
    try {
      const data = await getMedecins();
      setMedecins(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load medecins", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (medecin = null) => {
    setSelectedMedecin(medecin);
    setValidationErrors({});
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedMedecin(null);
  };

  const handleAdd = async (medecin) => {
    try {
      await addMedecin(medecin);
      loadMedecins();
      handleClose();
      return true;
    } catch (error) {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      } else if (error.errors) {
        setValidationErrors(error.errors);
      } else {
        alert("Erreur lors de l'ajout.");
      }
      return false;
    }
  };

  const handleUpdate = async (medecin) => {
    try {
      await updateMedecin(medecin);
      loadMedecins();
      handleClose();
      return true;
    } catch (error) {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      } else if (error.errors) {
        setValidationErrors(error.errors);
      } else {
        alert("Erreur lors de la modification.");
      }
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce médecin ?")) {
      try {
        await deleteMedecin(id);
        loadMedecins();
      } catch (e) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const filteredMedecins = medecins.filter((m) => {
    const s = search.toLowerCase();
    return (m.nom || "").toLowerCase().includes(s) || (m.id_medecin || "").toString().includes(s);
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Gestion des Médecins
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Nouveau Médecin</Button>
      </Box>

      <TextField
        label="Rechercher par nom ou ID"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <MedecinTable
        medecins={filteredMedecins}
        onEdit={handleOpen}
        onDelete={handleDelete}
      />

      {loading && <CircularProgress sx={{ display: 'block', m: '20px auto' }} />}

      <Modal open={openModal} onClose={handleClose}>
        <Paper sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            {selectedMedecin ? "Modifier Médecin" : "Ajouter Médecin"}
          </Typography>
          <MedecinForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            selectedMedecin={selectedMedecin}
            errors={validationErrors}
            setErrors={setValidationErrors}
            onCancel={handleClose}
          />
        </Paper>
      </Modal>
    </Box>
  );
}
