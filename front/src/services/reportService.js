import { API_URL } from "./api";

export const getStats = async () => {
    const response = await fetch(`${API_URL}/reports/stats`);
    return await response.json();
};

export const downloadCsv = () => {
    // Direct link to download
    window.open(`${API_URL}/reports/export/csv`, "_blank");
};

export const downloadPdf = () => {
    // Direct link to download
    window.open(`${API_URL}/reports/export/pdf`, "_blank");
};
