import { Typography, Box, Paper, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Apropos() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, flexGrow: 1, px: 2 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Titre */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <InfoOutlinedIcon color="primary" />
            À propos de
          </Typography>

          {/* Nom de l'application */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              background: "linear-gradient(45deg, #1565C0 30%, #42A5F5 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              mb: 1,
            }}
          >
            MediCare
          </Typography>

          <Typography gutterBottom>
            Une solution moderne et efficace pour la gestion des cliniques
            médicales.
          </Typography>

          {/* Description du projet */}
          <Typography paragraph>
            MediCare est une application web de gestion de clinique médicale
            conçue pour centraliser et organiser les informations essentielles
            liées aux patients, aux médecins, aux rendez-vous et aux dossiers
            médicaux.
          </Typography>

          <Typography paragraph>
            L’objectif de ce projet est de fournir une plateforme intuitive
            permettant au personnel médical de planifier les consultations,
            de gérer les patients et d’assurer un suivi médical structuré,
            tout en améliorant l’efficacité et la fiabilité des opérations
            quotidiennes.
          </Typography>

          <Typography paragraph>
            Développée dans un cadre académique, cette application vise
            également à mettre en pratique la programmation modulaire,
            la gestion des données, la manipulation des bases de données
            et l’utilisation de technologies web modernes.
          </Typography>

          {/* Mission */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderLeft: "5px solid #1565C0",
              backgroundColor: "#F5F9FF",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">🎯 Notre mission</Typography>
            <Typography>
              Simplifier la gestion médicale grâce à une solution digitale
              fiable, sécurisée et professionnelle.
            </Typography>
          </Box>

          {/* Contact */}
          <Typography variant="h6" mt={4}>
            Contact
          </Typography>
          <Typography>
            📧 Email : support@MediCare.com
            <br />
            📞 Téléphone : +216 00 000 000
            <br />
            🌐 Site web : www.MediCare.com
          </Typography>

          {/* Bouton retour */}
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 4 }}
            onClick={() => navigate("/")}
          >
            Retour à l'accueil
          </Button>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}
