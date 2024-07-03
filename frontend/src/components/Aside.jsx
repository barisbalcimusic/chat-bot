import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSidebarContext } from "../contexts/SidebarContext";
import HamMenu from "./HamMenu";
import { useEffect, useRef } from "react";

const Aside = () => {
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
      <div className="flex items-center p-3 w-full h-[50px] bg-[rgba(217,217,217,0.6)]">
        <FontAwesomeIcon
          icon={faBars}
          className="text-4xl"
          onClick={handleClick}
        />
      </div>
      <HamMenu menuRef={menuRef} />
    </>
  );
};

export default Aside;
