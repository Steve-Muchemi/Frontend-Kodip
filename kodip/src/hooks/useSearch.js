

import { useContext } from "react";
import AppContext from "../context/AppProvider";

const useOnSearch = () => {
    return useContext(AppContext);
}

export default useOnSearch;
