import { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { getPatients } from "../services/patientService";

export default function DossierForm({ onAdd, onUpdate, selectedDossier, errors: propErrors = {}, setErrors = () => { }, initialPatientId = null }) {
    const [dossier, setDossier] = useState({
        id_patient: "",
        observations: "",
        traitement: ""
    });
    const [patients, setPatients] = useState([]);

    const errors = propErrors;

    useEffect(() => {
        // Load patients for dropdown
        getPatients().then(setPatients);
    }, []);

    useEffect(() => {
        if (selectedDossier) {
            setDossier({
                ...selectedDossier,
                id_patient: selectedDossier.id_patient
            });
        } else if (initialPatientId) {
            setDossier(prev => ({ ...prev, id_patient: initialPatientId }));
        }
    }, [selectedDossier, initialPatientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDossier({ ...dossier, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async () => {
        const success = await (selectedDossier ? onUpdate(dossier) : onAdd(dossier));
        if (success) {
            setDossier({
                id_patient: "",
                observations: "",
                traitement: ""
            });
        }
    };

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
            <FormControl fullWidth error={!!errors.patient_id}>
                <InputLabel>Patient</InputLabel>
                <Select
                    name="id_patient"
                    value={dossier.id_patient}
                    label="Patient"
                    onChange={handleChange}
                    disabled={!!selectedDossier || !!initialPatientId} // Disable if editing existing or adding to specific patient history
                >
                    {patients.map((p) => (
                        <MenuItem key={p.id_patient} value={p.id_patient}>
                            {p.nom} {p.prenom}
                        </MenuItem>
                    ))}
                </Select>
                {errors.patient_id && <FormHelperText>{errors.patient_id}</FormHelperText>}
            </FormControl>

            <TextField
                name="observations"
                label="Observations"
                multiline
                rows={4}
                value={dossier.observations}
                onChange={handleChange}
                error={!!errors.observations}
                helperText={errors.observations}
            />

            <TextField
                name="traitement"
                label="Traitement / Prescription"
                multiline
                rows={3}
                value={dossier.traitement}
                onChange={handleChange}
                error={!!errors.traitement}
                helperText={errors.traitement}
            />

            <Button variant="contained" onClick={handleSubmit}>
                {selectedDossier ? "Mettre à jour" : "Créer Dossier"}
            </Button>
        </Box>
    );
}
