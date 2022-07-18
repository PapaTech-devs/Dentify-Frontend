import { createContext, useContext, useState } from "react";

const userDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState([]);
  return (
    <userDataContext.Provider value={[userData, setUserData]}>
      {children}
    </userDataContext.Provider>
  );
}

export const useUserData = () => useContext(userDataContext);
