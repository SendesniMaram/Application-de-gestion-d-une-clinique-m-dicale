import api from "./api";

export const getMedecins = async () => {
    const response = await api.get("/medecins");
    return response.data;
};

export const addMedecin = async (medecin) => {
    const response = await api.post("/medecins", medecin);
    return response.data;
};

export const updateMedecin = async (medecin) => {
    const response = await api.put(`/medecins/${medecin.id_medecin}`, medecin);
    return response.data;
};

export const deleteMedecin = async (id) => {
    await api.delete(`/medecins/${id}`);
};
