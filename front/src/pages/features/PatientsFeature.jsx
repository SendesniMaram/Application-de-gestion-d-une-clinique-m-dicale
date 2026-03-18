import { Container, Typography } from "@mui/material";

export default function PatientsFeature() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Gestion des patients
      </Typography>

      <Typography paragraph>
        Cette fonctionnalité permet l’ajout, la modification, la suppression
        et la recherche des patients au sein de la clinique.
      </Typography>

      <Typography paragraph>
        Chaque patient possède une fiche contenant les informations personnelles,
        les antécédents médicaux et les dossiers associés.
      </Typography>

      <Typography paragraph>
        Cette gestion centralisée facilite le suivi médical et améliore
        l’efficacité du personnel médical.
      </Typography>
    </Container>
  );
}
