import { API_URL } from "./api";

export const getDossiers = async (patientId = null) => {
    let url = `${API_URL}/dossiers`;
    if (patientId) {
        url += `?patient_id=${patientId}`;
    }
    const response = await fetch(url);
    return await response.json();
};

export const addDossier = async (dossier) => {
    const response = await fetch(`${API_URL}/dossiers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dossier),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    return await response.json();
};

export const updateDossier = async (dossier) => {
    const response = await fetch(`${API_URL}/dossiers/${dossier.id_dossier}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dossier),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    return await response.json();
};

export const deleteDossier = async (id) => {
    await fetch(`${API_URL}/dossiers/${id}`, {
        method: "DELETE",
    });
};
