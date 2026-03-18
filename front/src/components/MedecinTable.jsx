import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from "@mui/material";

export default function MedecinTable({ medecins, onEdit, onDelete }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Spécialité</TableCell>
                    <TableCell>Téléphone</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {medecins.map((m) => {
                    if (!m) return null;
                    return (
                        <TableRow key={m.id_medecin}>
                            <TableCell>{m.id_medecin}</TableCell>
                            <TableCell>{m.nom}</TableCell>
                            <TableCell>{m.specialite}</TableCell>
                            <TableCell>{m.telephone}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(m)}>Modifier</Button>
                                <Button color="error" onClick={() => onDelete(m.id_medecin)}>
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
