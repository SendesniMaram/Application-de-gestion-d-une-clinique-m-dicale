import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export default function Navbar({ hideUserInfo = false }) {
  // Récupération sécurisée de l'utilisateur
  let username = null;
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      username = user.username === "admin" ? "Administrateur" : user.username;
    }
  } catch (e) {
    console.error("Erreur parsing localStorage", e);
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff",
        color: "#000",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>

        {/* LOGO SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Main Icon */}
          <MonitorHeartIcon sx={{ color: "#1565C0", fontSize: 42 }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#1565C0", // Deep Blue
                textTransform: "uppercase",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: "1.8rem",
              }}
            >
              MEDICARE
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#546E7A", // Blue Grey for subtitle
                letterSpacing: "2px",
                fontWeight: 600,
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              Plus qu'un gestionnaire du clinique
            </Typography>
          </Box>
        </Box>

        {!hideUserInfo && username && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" fontWeight="bold" color="text.secondary">{username}</Typography>
            <Avatar sx={{ bgcolor: "#1565C0", color: "#fff", fontWeight: "bold" }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
