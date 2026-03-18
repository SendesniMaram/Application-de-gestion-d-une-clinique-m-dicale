import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

export default function PatientTable({ patients, onEdit, onDelete, onViewHistory }) {
    return (
        <Table sx={{ mt: 3 }}>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Âge</TableCell>
                    <TableCell>Téléphone</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {patients.map((p) => {
                    if (!p) return null;
                    return (
                        <TableRow key={p.id_patient}>
                            <TableCell>{p.id_patient}</TableCell>
                            <TableCell>{p.nom}</TableCell>
                            <TableCell>{p.prenom}</TableCell>
                            <TableCell>{p.age}</TableCell>
                            <TableCell>{p.telephone}</TableCell>
                            <TableCell>
                                <Button size="small" onClick={() => onEdit(p)}>Modifier</Button>
                                <Button size="small" color="secondary" onClick={() => onViewHistory(p.id_patient)}>Historique</Button>
                                <Button size="small" color="error" onClick={() => onDelete(p.id_patient)}>
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
