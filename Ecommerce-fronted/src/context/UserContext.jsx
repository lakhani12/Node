// save and make your data centerlized

import { createContext , useState} from "react";

export const DataContext = createContext();


const UserContext = ({children}) => {
    const [Centerdata, setCenterData] = useState("");
  return (
    <DataContext.Provider value={{ data: Centerdata, setCenterData }}>
      <div>
        {children}
      </div>
    </DataContext.Provider>
  );
};

export default UserContext;
