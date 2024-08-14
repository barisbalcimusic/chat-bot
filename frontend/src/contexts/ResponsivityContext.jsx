import { createContext, useContext, useState } from "react";

export const ResponsivityContext = createContext();

const ResponsivityProvider = ({ children }) => {
  const [height, setHeight] = useState(null);

  window.addEventListener("load", () => {
    setHeight(window.innerHeight);
  });

  window.addEventListener("resize", () => {
    setHeight(window.innerHeight);
  });

  return (
    <ResponsivityContext.Provider value={{ height }}>
      {children}
    </ResponsivityContext.Provider>
  );
};

export default ResponsivityProvider;

export const useResponsivityContext = () => {
  return useContext(ResponsivityContext);
};
