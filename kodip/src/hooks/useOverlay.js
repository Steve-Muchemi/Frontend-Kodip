
import { useContext } from "react";
import AppContext from "../context/AppProvider";

const useOverlay = () => {
    return useContext(AppContext);
}

export default useOverlay;
