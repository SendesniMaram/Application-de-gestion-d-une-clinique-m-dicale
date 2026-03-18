import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
  { text: "Patients", path: "/patients", icon: <PeopleIcon /> },
  { text: "Médecins", path: "/medecins", icon: <LocalHospitalIcon /> },
  { text: "Rendez-vous", path: "/rdv", icon: <EventIcon /> },
  { text: "Dossier Médical", path: "/dossier", icon: <FolderSharedIcon /> },
  { text: "Rapports", path: "/rapports", icon: <BarChartIcon /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0d47a1",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🏥 MediCare - Gestion de clinique
        </Typography>
      </Toolbar>

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
