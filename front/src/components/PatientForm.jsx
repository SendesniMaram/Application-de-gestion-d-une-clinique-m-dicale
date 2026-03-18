import { useEffect, useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";

export default function PatientForm({ onAdd, onUpdate, selectedPatient, errors: propErrors = {}, setErrors = () => { }, onCancel }) {
    const [patient, setPatient] = useState({
        nom: "",
        prenom: "",
        age: "",
        adresse: "",
        telephone: "",
        antecedents: "",
        email: "",
        password: ""
    });

    const errors = propErrors;

    useEffect(() => {
        if (selectedPatient) {
            setPatient({
                ...selectedPatient,
                password: "" // Clear password field for update
            });
        } else {
            setPatient({
                nom: "",
                prenom: "",
                age: "",
                adresse: "",
                telephone: "",
                antecedents: "",
                email: "",
                password: ""
            });
        }
    }, [selectedPatient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await (selectedPatient ? onUpdate(patient) : onAdd(patient));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                <TextField name="nom" label="Nom" value={patient.nom} onChange={handleChange} error={!!errors.nom} helperText={errors.nom} required />
                <TextField name="prenom" label="Prénom" value={patient.prenom} onChange={handleChange} error={!!errors.prenom} helperText={errors.prenom} required />
                <TextField name="age" label="Âge" type="number" value={patient.age} onChange={handleChange} error={!!errors.age} helperText={errors.age} required />
                <TextField name="telephone" label="Téléphone (8 chiffres)" value={patient.telephone} onChange={handleChange} error={!!errors.telephone} helperText={errors.telephone || "Ex: 11223344"} inputProps={{ maxLength: 8 }} required />
                <TextField name="email" label="Email" type="email" value={patient.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
                <TextField name="password" label={selectedPatient ? "Pass (Optionnel)" : "Mot de passe"} type="password" value={patient.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} required={!selectedPatient} />
            </Box>
            <TextField name="adresse" label="Adresse" fullWidth sx={{ mb: 2 }} value={patient.adresse} onChange={handleChange} error={!!errors.adresse} helperText={errors.adresse} required />
            <TextField name="antecedents" label="Antécédents" fullWidth multiline rows={2} sx={{ mb: 3 }} value={patient.antecedents} onChange={handleChange} error={!!errors.antecedents} helperText={errors.antecedents} />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={onCancel}>Annuler</Button>
                <Button variant="contained" type="submit">
                    {selectedPatient ? "Mettre à jour" : "Ajouter"}
                </Button>
            </Stack>
        </Box>
    );
}
