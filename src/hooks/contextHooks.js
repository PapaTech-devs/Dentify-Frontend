import { createContext, useContext } from "react";
import useFirebaseAuth from "../firebase/client";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => {},
  createUser: async () => {},
  signMeOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
