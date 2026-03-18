import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
