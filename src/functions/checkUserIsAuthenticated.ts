"use client"
import { api } from "@/api/api.connect";

export const checkUserIsAuthenticated = async () => {
    const token = localStorage.getItem("@ContactsKeep:TOKEN");


    if (!token) {

        return false;
    }

    const tokenIsValid = await api.get('auth/profile', {
        headers: {
            Authorization: token
        }
    });


    if (tokenIsValid.status == 200) {
        return true
    }
    localStorage.removeItem("@ContactsKeep:TOKEN");
    return false

}