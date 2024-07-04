import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";

const Ham = () => {
  const { sidebar, setSidebar } = useSidebarContext();
  const menuRef = useRef();

  useEffect(() => {
    if (sidebar) {
      menuRef.current.style.display = "block";
    } else {
      menuRef.current.style.display = "none";
    }
  }, [sidebar]);

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div
        id="ham"
        className="w-full h-[50px] flex items-center lg:hidden p-3 bg-[rgba(217,217,217,0.6)]"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-4xl"
          onClick={handleClick}
        />
      </div>
      <Sidebar menuRef={menuRef} />
    </>
  );
};

export default Ham;
