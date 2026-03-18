import { Table, TableBody, TableCell, TableHead, TableRow, Button, Chip } from "@mui/material";

export default function RendezVousTable({ rdvs, onDelete }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Heure</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Médecin</TableCell>
                    <TableCell>Motif</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rdvs.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} align="center">Aucun rendez-vous prévu.</TableCell>
                    </TableRow>
                ) : (
                    rdvs.map((rdv) => {
                        if (!rdv) return null;
                        return (
                            <TableRow key={rdv.id_rdv}>
                                <TableCell>{rdv.date_rdv}</TableCell>
                                <TableCell>
                                    <Chip label={rdv.heure_rdv} color="primary" variant="outlined" size="small" />
                                </TableCell>
                                <TableCell>{rdv.patient_nom} {rdv.patient_prenom}</TableCell>
                                <TableCell>Dr. {rdv.medecin_nom}</TableCell>
                                <TableCell>{rdv.motif}</TableCell>
                                <TableCell>
                                    <Button color="error" size="small" onClick={() => onDelete(rdv.id_rdv)}>
                                        Annuler
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    );
}
