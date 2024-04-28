
import { createContext, useState } from "react";

const AppContext = createContext({});

console.log('app provider render')
export const AppProvider = ({ children }) => {
  
  
  const [overlay, setOverlay] = useState(false);
  const [onSearch, setOnSearch] = useState([]);
  const [postCoordinates, setPostCoordinates] = useState({})
  const [samplePosts, setsamplePosts] = useState([])

  return (
    <AppContext.Provider value={{ overlay, setOverlay, onSearch, setOnSearch, postCoordinates, setPostCoordinates, samplePosts, setsamplePosts}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
