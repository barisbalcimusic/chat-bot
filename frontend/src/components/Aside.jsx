import { useLoginContext } from "../contexts/LoginContext";

const Aside = () => {
  const { loggedIn } = useLoginContext();

  return (
    <div className="w-[300px] h-full hidden lg:flex lg:flex-col bg-[#D9D9D9]">
      <div
        id="history-preview"
        className="w-full h-full flex flex-col gap-3 p-3 overflow-x-auto"
      ></div>
      <div className="min-h-[120px] min flex justify-center items-center bg-slate-500">
        <button className={!loggedIn && "hidden"}>Login</button>
        <button
          className={
            loggedIn
              ? "hidden"
              : "w-[150px] p-3 rounded-[5px] hover:bg-[#C5E7E5] bg-[#9FC1BF] "
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Aside;
