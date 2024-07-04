const Sidebar = ({ menuRef }) => {
  return (
    <div
      ref={menuRef}
      className="h-full w-full lg:w-[200px] hidden bg-[#D9D9D9] absolute z-10"
    ></div>
  );
};

export default Sidebar;
