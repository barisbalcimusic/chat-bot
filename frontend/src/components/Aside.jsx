import { useLoginContext } from "../contexts/LoginContext";

const Aside = () => {
  const { loggedIn, setLoggedIn } = useLoginContext();

  //! QUICK LOGIN / LOGOUT ONLY FOR TESTING
  const handleClick = () => {
    setLoggedIn((value) => !value);
  };

  return (
    <div className="w-[300px] h-full hidden lg:flex lg:flex-col bg-[#D9D9D9]">
      <div className="min-h-[120px] min flex justify-center items-center bg-slate-500">
        <button
          onClick={handleClick}
          className="w-[150px] p-3 rounded-[5px] hover:bg-[#C5E7E5] bg-[#9FC1BF]"
        >
          {loggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Aside;
