import api from "./api";

export const getPatients = async () => {
    const response = await api.get("/patients");
    return response.data;
};

export const addPatient = async (patient) => {
    const response = await api.post("/patients", patient);
    return response.data;
};

export const updatePatient = async (patient) => {
    const response = await api.put(`/patients/${patient.id_patient}`, patient);
    return response.data;
};

export const deletePatient = async (id) => {
    await api.delete(`/patients/${id}`);
};
