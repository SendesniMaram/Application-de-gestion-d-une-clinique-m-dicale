import { useEffect, useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";

export default function MedecinForm({ onAdd, onUpdate, selectedMedecin, errors: propErrors = {}, setErrors = () => { }, onCancel }) {
    const [form, setForm] = useState({
        nom: "",
        specialite: "",
        telephone: "",
        email: "",
        password: ""
    });

    const errors = propErrors;

    useEffect(() => {
        if (selectedMedecin) {
            setForm({
                nom: selectedMedecin.nom || "",
                specialite: selectedMedecin.specialite || "",
                telephone: selectedMedecin.telephone || "",
                email: selectedMedecin.email || "",
                id_medecin: selectedMedecin.id_medecin,
                password: "" // Clear password field for update
            });
        } else {
            setForm({ nom: "", specialite: "", telephone: "", email: "", password: "" });
        }
    }, [selectedMedecin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await (selectedMedecin ? onUpdate(form) : onAdd(form));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                name="nom"
                label="Nom"
                fullWidth
                sx={{ mb: 2 }}
                value={form.nom}
                onChange={handleChange}
                error={!!errors.nom}
                helperText={errors.nom}
                required
            />
            <TextField
                name="specialite"
                label="Spécialité"
                fullWidth
                sx={{ mb: 2 }}
                value={form.specialite}
                onChange={handleChange}
                error={!!errors.specialite}
                helperText={errors.specialite}
                required
            />
            <TextField
                name="telephone"
                label="Téléphone (8 chiffres)"
                fullWidth
                sx={{ mb: 2 }}
                value={form.telephone}
                onChange={handleChange}
                error={!!errors.telephone}
                helperText={errors.telephone || "Ex: 11223344"}
                inputProps={{ maxLength: 8 }}
                required
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                sx={{ mb: 2 }}
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
            />
            <TextField
                name="password"
                label={selectedMedecin ? "Mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
                type="password"
                fullWidth
                sx={{ mb: 3 }}
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required={!selectedMedecin}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={onCancel}>Annuler</Button>
                <Button variant="contained" type="submit">
                    {selectedMedecin ? "Mettre à jour" : "Ajouter"}
                </Button>
            </Stack>
        </Box>
    );
}
