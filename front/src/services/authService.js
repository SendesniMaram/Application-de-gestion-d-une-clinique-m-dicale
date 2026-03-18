import { API_URL } from "./api";

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Identifiants incorrects");
    }

    return await response.json();
};
