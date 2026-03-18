import { Box, Typography } from "@mui/material";

export default function Footer({ darkMode = false }) {
    return (
        <Box
            sx={{
                py: 3,
                textAlign: "center",
                color: darkMode ? "rgba(255,255,255,0.7)" : "#777",
                backgroundColor: darkMode ? "#0d47a1" : "#f5f7fb",
                width: "100%",
                borderTop: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #eee",
            }}
        >
            <Typography variant="body2" gutterBottom>
                © 2025 – Application de gestion de clinique médicale
            </Typography>
            <Typography variant="body2">
                🌐 www.MediCare.com | 📧 support@MediCare.com
            </Typography>
        </Box>
    );
}
