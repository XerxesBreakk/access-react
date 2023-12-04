import { createContext, useState } from "react";

export const AuthContext = createContext({});

const authInitialState = {
  access: "",
  refresh: "",
  is_authenticated: false,
  user: null,
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authInitialState);
  const login= (values) => {
    setAuth((prev) =>({...prev,access:values.access,refresh:values.refresh}));
  }
  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
