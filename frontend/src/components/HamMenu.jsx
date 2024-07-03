const HamMenu = ({ menuRef }) => {
  return (
    <div
      ref={menuRef}
      className="h-full w-full bg-[#D9D9D9] hidden absolute z-10"
    ></div>
  );
};

export default HamMenu;
