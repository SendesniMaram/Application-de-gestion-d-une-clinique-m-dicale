import { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Paper, Button } from "@mui/material";
import RendezVousForm from "../components/RendezVousForm";
import RendezVousTable from "../components/RendezVousTable";
import { getRendezVous, addRendezVous, deleteRendezVous } from "../services/rdvService";
import { getPatients } from "../services/patientService";

export default function RendezVous() {
  const [rdvs, setRdvs] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filters, setFilters] = useState({ date: "", id_patient: "" });

  useEffect(() => {
    loadData();
    loadRdvs();
  }, []);

  // Reload RDVs when filters change
  useEffect(() => {
    loadRdvs();
  }, [filters]);

  const loadData = async () => {
    const p = await getPatients();
    setPatients(p);
  };

  const loadRdvs = async () => {
    try {
      const data = await getRendezVous(filters);
      if (Array.isArray(data)) {
        setRdvs(data);
      } else {
        console.error("RDVs data is not an array:", data);
        setRdvs([]);
      }
    } catch (e) {
      console.error("Error loading RDVs:", e);
    }
  };

  const handleAdd = async (rdv) => {
    await addRendezVous(rdv);
    loadRdvs(); // Refresh list after add
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) {
      await deleteRendezVous(id);
      loadRdvs();
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Planification des Rendez-vous
      </Typography>

      {/* Formulaire d'ajout */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Nouveau Rendez-vous</Typography>
        <RendezVousForm onAdd={handleAdd} />
      </Paper>

      {/* Filtres */}
      <Paper sx={{ p: 2, mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">Filtrer :</Typography>
        <TextField
          type="date"
          label="Date"
          name="date"
          InputLabelProps={{ shrink: true }}
          value={filters.date}
          onChange={handleFilterChange}
          size="small"
          sx={{ width: 200 }}
        />
        <TextField
          select
          label="Patient"
          name="id_patient"
          value={filters.id_patient}
          onChange={handleFilterChange}
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value="">Tous les patients</MenuItem>
          {Array.isArray(patients) && patients.map((p) => {
            if (!p) return null;
            return (
              <MenuItem key={p.id_patient} value={p.id_patient}>
                {p.nom} {p.prenom}
              </MenuItem>
            );
          })}
        </TextField>
        <Button onClick={() => setFilters({ date: "", id_patient: "" })}>Réinitialiser</Button>
      </Paper>

      {/* Liste */}
      <RendezVousTable rdvs={rdvs} onDelete={handleDelete} />
    </Box>
  );
}
