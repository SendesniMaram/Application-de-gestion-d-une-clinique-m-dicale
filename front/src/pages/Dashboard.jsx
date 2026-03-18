import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Button, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getStats } from "../services/reportService";
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (e) {
      console.error("Failed to load dashboard stats", e);
    }
  };

  if (!stats) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  }

  const globalCards = [
    { title: "Patients Total", value: stats.nb_patients, icon: <PeopleIcon sx={{ fontSize: 40, color: "#1976d2" }} />, link: "/patients" },
    { title: "Médecins", value: stats.nb_medecins, icon: <LocalHospitalIcon sx={{ fontSize: 40, color: "#2e7d32" }} />, link: "/medecins" },
    { title: "Rendez-vous", value: stats.nb_rdvs, icon: <CalendarTodayIcon sx={{ fontSize: 40, color: "#ed6c02" }} />, link: "/rdv" },
    { title: "Spécialités Top", value: stats.top_specialites.length > 0 ? stats.top_specialites[0].specialite : "N/A", icon: <DescriptionIcon sx={{ fontSize: 40, color: "#9c27b0" }} />, link: "/rapports" },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* ================= BANNIÈRE DE BIENVENUE ================= */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          mb: 4,
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(/images/bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          p: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            Bonjour Administrateur 👋
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Voici un aperçu rapide de votre clinique aujourd'hui
          </Typography>
        </Box>
      </Box>

      {/* ================= SECTION AUJOURD'HUI ================= */}
      <Typography variant="h5" fontWeight="600" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarTodayIcon color="primary" /> Aujourd'hui
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, borderLeft: '6px solid #1976d2', bgcolor: '#e3f2fd' }}>
            <Typography variant="h4" fontWeight="bold">{stats.rdvs_today || 0}</Typography>
            <Typography color="text.secondary">Rendez-vous programmés</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, borderLeft: '6px solid #2e7d32', bgcolor: '#e8f5e9' }}>
            <Typography variant="h4" fontWeight="bold">{stats.available_doctors || 0}</Typography>
            <Typography color="text.secondary">Médecins disponibles</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= STATISTIQUES GLOBALES ================= */}
      <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
        Statistiques Globales
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {globalCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 8 }
              }}
              onClick={() => navigate(card.link)}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ mr: 2, p: 1, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.03)' }}>{card.icon}</Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">{card.value}</Typography>
                  <Typography color="text.secondary" variant="body2">{card.title}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= ACTIONS RAPIDES ================= */}
      <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          Actions Rapides
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Button variant="contained" size="large" onClick={() => navigate("/patients")} sx={{ borderRadius: 2 }}>
            Gérer Patients
          </Button>
          <Button variant="contained" color="success" size="large" onClick={() => navigate("/rdv")} sx={{ borderRadius: 2 }}>
            Nouveau Rendez-vous
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate("/rapports")} sx={{ borderRadius: 2 }}>
            Voir Rapports
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
