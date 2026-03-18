import api from "./api";

export const getRendezVous = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await api.get(`/rdvs?${query}`);
    return res.data;
};

export const addRendezVous = async (rdv) => {
    const res = await api.post("/rdvs", rdv);
    return res.data;
};

export const deleteRendezVous = async (id) => {
    await api.delete(`/rdvs/${id}`);
};
