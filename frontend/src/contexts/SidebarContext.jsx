import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
