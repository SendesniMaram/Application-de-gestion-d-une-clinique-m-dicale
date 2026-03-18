import { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Alert } from "@mui/material";
import { getPatients } from "../services/patientService";
import { getMedecins } from "../services/medecinService";

export default function RendezVousForm({ onAdd }) {
    const [patients, setPatients] = useState([]);
    const [medecins, setMedecins] = useState([]);
    const [error, setError] = useState("");

    const [rdv, setRdv] = useState({
        id_patient: "",
        id_medecin: "",
        date_rdv: "",
        heure_rdv: "09:00",
        motif: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // In a real app we might handle loading states
            const p = await getPatients();
            const m = await getMedecins();
            setPatients(p);
            setMedecins(m);
        } catch (e) {
            console.error("Error loading selection data", e);
        }
    };

    const handleChange = (e) => {
        setRdv({ ...rdv, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await onAdd(rdv);
            // Reset crucial fields but keep maybe others? Let's reset all.
            setRdv({ ...rdv, motif: "", date_rdv: "", heure_rdv: "09:00", id_patient: "", id_medecin: "" });
        } catch (err) {
            // The error from backend (like conflict) is thrown here
            setError(err.response?.data?.error || "Erreur lors de l'ajout");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                <TextField
                    select
                    label="Patient"
                    name="id_patient"
                    value={rdv.id_patient}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    {patients.map((p) => (
                        <MenuItem key={p.id_patient} value={p.id_patient}>
                            {p.nom} {p.prenom} (ID: {p.id_patient})
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Médecin"
                    name="id_medecin"
                    value={rdv.id_medecin}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    {medecins.map((m) => (
                        <MenuItem key={m.id_medecin} value={m.id_medecin}>
                            Dr. {m.nom} ({m.specialite})
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    type="date"
                    label="Date"
                    name="date_rdv"
                    InputLabelProps={{ shrink: true }}
                    value={rdv.date_rdv}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    type="time"
                    label="Heure"
                    name="heure_rdv"
                    InputLabelProps={{ shrink: true }}
                    value={rdv.heure_rdv}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Motif"
                    name="motif"
                    value={rdv.motif}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                />

                <Button type="submit" variant="contained" sx={{ gridColumn: "span 2", mt: 1 }}>
                    Planifier le rendez-vous
                </Button>
            </Box>
        </Box>
    );
}
