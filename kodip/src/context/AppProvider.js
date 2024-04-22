import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [overlay, setOverlay] = useState(false);
  const [onSearch, setOnSearch] = useState([]);
  const [postCoordinates, setPostCoordinates] = useState({})
  return (
    <AppContext.Provider value={{ overlay, setOverlay, onSearch, setOnSearch}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
