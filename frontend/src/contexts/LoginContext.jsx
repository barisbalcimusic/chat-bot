import { createContext, useContext, useState } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLoginContext = () => {
  return useContext(LoginContext);
};
