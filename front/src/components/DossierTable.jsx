import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from "@mui/material";

export default function DossierTable({ dossiers, onEdit, onDelete }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Dernière Visite</TableCell>
                    <TableCell>Observations (Aperçu)</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {dossiers.map((d) => {
                    if (!d) return null;
                    return (
                        <TableRow key={d.id_dossier}>
                            <TableCell>{d.id_dossier}</TableCell>
                            <TableCell>{d.patient_nom || d.id_patient}</TableCell>
                            <TableCell>{d.date_derniere_visite}</TableCell>
                            <TableCell>
                                {d.observations && d.observations.length > 50
                                    ? d.observations.substring(0, 50) + "..."
                                    : d.observations}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(d)}>Ouvrir/Modifier</Button>
                                <Button color="error" onClick={() => onDelete(d.id_dossier)}>
                                    Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
