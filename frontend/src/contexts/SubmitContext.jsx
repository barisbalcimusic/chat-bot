import { createContext, useContext, useState } from "react";

export const SubmitContext = createContext();

const SubmitContextProvider = ({ children }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SubmitContext.Provider value={{ submitted, setSubmitted }}>
      {children}
    </SubmitContext.Provider>
  );
};

export default SubmitContextProvider;

export const useSubmitContext = () => {
  return useContext(SubmitContext);
};