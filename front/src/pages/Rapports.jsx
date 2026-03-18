import { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getStats, downloadCsv, downloadPdf } from "../services/reportService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f', '#00bcd4', '#ffeb3b', '#795548'];

export default function Rapports() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (e) {
      console.error("Failed to load stats", e);
    }
  };

  if (!stats) return <Typography>Chargement...</Typography>;

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Rapports & Statistiques
        </Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => window.print()}>
            Imprimer
          </Button>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={downloadPdf}>
            Exporter PDF
          </Button>
          <Button variant="contained" onClick={downloadCsv}>
            Exporter CSV
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontWeight="500">Total Patients</Typography>
              <Typography variant="h3" sx={{ mt: 1, fontWeight: 700 }}>{stats.nb_patients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e8f5e9", borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontWeight="500">Total Médecins</Typography>
              <Typography variant="h3" sx={{ mt: 1, fontWeight: 700 }}>{stats.nb_medecins}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#fff3e0", borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontWeight="500">Total Rendez-vous</Typography>
              <Typography variant="h3" sx={{ mt: 1, fontWeight: 700 }}>{stats.nb_rdvs}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Répartition des Rendez-vous par Spécialité
            </Typography>
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.top_specialites}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="specialite"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    fontSize={12}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" name="Nombre de RDV" radius={[4, 4, 0, 0]}>
                    {stats.top_specialites.map((entry, index) => (
                      <Cell key={`cell - ${index} `} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Détails des Spécialités
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Spécialité</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>RDV</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.top_specialites.map((spec, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length], mr: 1.5 }} />
                        {spec.specialite}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{spec.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
