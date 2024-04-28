
import { useContext } from "react";
import { AuthProvider } from "../context/AuthProvider";

export const useAuthContext = () => {
    return useContext(AuthProvider);
};
