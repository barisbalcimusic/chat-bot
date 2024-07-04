import { createContext, useContext, useState } from "react";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggenIn] = useState(false);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggenIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

export const useLoginContext = () => {
  return useContext(LoginContext);
};
