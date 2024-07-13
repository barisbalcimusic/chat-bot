import { createContext, useContext, useState } from "react";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

export const useLoginContext = () => {
  return useContext(LoginContext);
};
