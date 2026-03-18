import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Inscription() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient"); // Default to patient
  const [error, setError] = useState("");

  // Form state matching exact backend schema
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    adresse: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    antecedents: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!role) {
      setError("Veuillez sélectionner un rôle");
      return;
    }

    // Determine endpoint based on role
    // Note: Only Patient is fully implemented with new schema for now based on request
    // But we prepared auth logic for 'medical' too if needed later.
    const endpoint = role === "patient" ? "/api/patients" : "/api/medecins";

    // Construct payload
    const payload = { ...formData };
    // Convert age to int
    if (payload.age) payload.age = parseInt(payload.age, 10);
    delete payload.confirmPassword; // Don't send confirm field

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
      }

      // Success
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ p: 4 }}>

            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
              Inscription
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }} align="center">
              Créez votre compte MediCare
            </Typography>

            <Typography sx={{ mb: 1, fontWeight: 500 }} align="center">
              Vous êtes :
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
              {/* Admin registration is usually not done here, but leaving option if requested or hiding it. 
                   User asked for Patient/Medecin app. Let's focus on Patient/Medecin. */}
              <Button
                variant={role === "medical" ? "contained" : "outlined"}
                onClick={() => setRole("medical")}
              >
                Médecin
              </Button>
              <Button
                variant={role === "patient" ? "contained" : "outlined"}
                onClick={() => setRole("patient")}
              >
                Patient
              </Button>
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleRegister}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    name="nom"
                    label="Nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    name="prenom"
                    label="Prénom"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    name="age"
                    label="Age"
                    type="number"
                    required
                    value={formData.age}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    name="telephone"
                    label="Téléphone (8 chiffres)"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Ex: 55667788"
                    inputProps={{ maxLength: 8 }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  name="adresse"
                  label="Adresse"
                  required
                  value={formData.adresse}
                  onChange={handleChange}
                />

                {role === "patient" && (
                  <TextField
                    fullWidth
                    name="antecedents"
                    label="Antécédents médicaux"
                    multiline
                    rows={3}
                    value={formData.antecedents}
                    onChange={handleChange}
                  />
                )}
                {/* For medecin we might add Specialty field later, but staying simple for now matching schema */}

                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!role}
                  sx={{ mt: 2 }}
                >
                  S’inscrire
                </Button>
              </Stack>
            </form>

            <Typography sx={{ mt: 3 }} align="center">
              Vous avez déjà un compte ?
              <Button
                variant="text"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Retour à l’accueil
            </Button>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
