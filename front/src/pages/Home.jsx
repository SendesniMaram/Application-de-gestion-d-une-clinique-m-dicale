import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar hideUserInfo={true} />

      {/* ... Hero and Features sections ... */}
      <Box sx={{ flexGrow: 1 }}>
        {/* ================= HERO ================= */}
        <Box
          sx={{
            marginTop: "64px",
            backgroundImage:
              "linear-gradient(rgba(25,118,210,0.65), rgba(25,118,210,0.45)), url(/images/medecins.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            py: 14,
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  Gestion intelligente de votre clinique médicale
                </Typography>

                <Typography sx={{ mt: 3, fontSize: "1.2rem", opacity: 0.95 }}>
                  MediCare est une application moderne permettant de centraliser la
                  gestion des patients, médecins, rendez-vous et dossiers médicaux
                  dans une plateforme unique, sécurisée et intuitive.
                </Typography>

                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#fff",
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Accéder à l’application
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                    onClick={() => navigate("/apropos")}
                  >
                    À propos
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* ================= IMAGE AC2 ================= */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <img
            src="/images/ac2.png"
            alt="Accueil Clinique"
            style={{
              width: "auto",
              maxWidth: "60%", // Taille réduite à 60% de la largeur
              maxHeight: "400px", // Hauteur maximale réduite
              borderRadius: 16,
              objectFit: "contain",
              display: "block"
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, textAlign: "center", mb: 8 }}
          >
            Fonctionnalités principales
          </Typography>

          {/* ================= FONCTIONNALITÉS DÉTAILLÉES ================= */}


          {/* Médecins */}
          <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
            <Grid item xs={12} md={6}>
              <img
                src="/images/medcin.jpeg"
                alt="Gestion des médecins"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#1565C0" }}>
                Gestion des médecins
              </Typography>
              <Typography sx={{ mt: 2 }} color="text.secondary">
                Centralisez les informations des médecins : identité, spécialité,
                coordonnées et disponibilité. Cette fonctionnalité facilite
                l’organisation du personnel médical et l’attribution des
                rendez-vous.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 3 }}
                onClick={() => navigate("/fonctionnalites/medecins")}
              >
                Voir plus
              </Button>
            </Grid>
          </Grid>

          {/* Rendez-vous */}
          <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#1565C0" }}>
                Gestion des rendez-vous
              </Typography>
              <Typography sx={{ mt: 2 }} color="text.secondary">
                Planifiez les consultations médicales en attribuant un médecin, une
                date et une heure précises. Le système permet d’éviter les conflits
                d’horaires et d’assurer une gestion fluide du planning.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 3 }}
                onClick={() => navigate("/fonctionnalites/medecins")}
              >
                Voir plus
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="/images/rendez.jpeg"
                alt="Gestion des rendez-vous"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>
          </Grid>

          {/* Patients */}
          <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
            <Grid item xs={12} md={6}>
              <img
                src="/images/pation.jpeg"
                alt="Gestion des patients"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#1565C0" }}>
                Gestion des patients
              </Typography>
              <Typography sx={{ mt: 2 }} color="text.secondary">
                Chaque patient dispose d’une fiche complète regroupant ses données
                personnelles, ses antécédents et son historique médical afin
                d’assurer un suivi précis et continu.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 3 }}
                onClick={() => navigate("/fonctionnalites/medecins")}
              >
                Voir plus
              </Button>
            </Grid>
          </Grid>

          {/* Dossiers médicaux */}
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#1565C0" }}>
                Dossiers médicaux
              </Typography>
              <Typography sx={{ mt: 2 }} color="text.secondary">
                Accédez aux dossiers médicaux électroniques contenant les
                observations, traitements et dates de consultation pour une vision
                globale et fiable de l’état de santé du patient.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 3 }}
                onClick={() => navigate("/fonctionnalites/medecins")}
              >
                Voir plus
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="/images/Dossiers.jpeg"
                alt="Dossiers médicaux"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>
          </Grid>
        </Container>



        {/* ================= AIDE ================= */}
        <Box sx={{ backgroundColor: "#e3f2fd", py: 6 }}>
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <SupportAgentIcon sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
              Besoin d’aide ?
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Contactez l’administration de la clinique pour toute assistance ou
              information complémentaire.
            </Typography>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
