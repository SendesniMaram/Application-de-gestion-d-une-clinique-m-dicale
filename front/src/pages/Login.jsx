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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { API_URL } from "../services/api";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // This will be email for patients/doctors
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("admin"); // Default to admin

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // NOTE: We rely on authService.login calling /api/auth/login
      // We need to make sure we pass the role and that authService handles it or we call fetch directly.
      // Let's call fetch directly here to be sure, or update service (but I can't see service file right now effectively).
      // I'll use fetch directly for clarity and matching my backend update.

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username,
          username: username,
          password,
          role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de la connexion");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Identifiants incorrects");
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
        <Container maxWidth="xs">
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Connexion
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Espace {role === 'admin' ? 'Administrateur' : (role === 'medical' ? 'Personnel Médical' : 'Patient')}
            </Typography>

            <Typography sx={{ mb: 1, fontWeight: 500 }}>
              Vous êtes :
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
              <Button
                variant={role === "admin" ? "contained" : "outlined"}
                onClick={() => setRole("admin")}
                sx={{ textTransform: 'none' }}
              >
                Admin
              </Button>
              <Button
                variant={role === "medical" ? "contained" : "outlined"}
                onClick={() => setRole("medical")}
                sx={{ textTransform: 'none' }}
              >
                Médecin
              </Button>
              <Button
                variant={role === "patient" ? "contained" : "outlined"}
                onClick={() => setRole("patient")}
                sx={{ textTransform: 'none' }}
              >
                Patient
              </Button>
            </Stack>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label={role === "admin" ? "Nom d'utilisateur" : "Email"}
                margin="normal"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                fullWidth
                label="Mot de passe"
                margin="normal"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 3 }}
              >
                Se connecter
              </Button>
            </form>

            <Typography sx={{ mt: 3 }}>
              Vous n’avez pas de compte ?
              <Button
                variant="text"
                onClick={() => navigate("/inscription")}
              >
                Inscrivez-vous
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
