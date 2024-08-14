import { Link } from "react-router-dom";
import { useResponsivityContext } from "../contexts/ResponsivityContext";

const Home = () => {
  const { height } = useResponsivityContext();

  return (
    <div
      style={{ height: `${height}px` }}
      className={`w-screen flex flex-col gap-10 bg-black text-white justify-center items-center`}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold text-gray-500">ChatBot by Baris</h2>
        <h1 className="text-5xl font-bold">Let's start</h1>
      </div>
      <div className="flex flex-col gap-5">
        <Link
          className="w-[200px] rounded-[30px] text-center hover:bg-[#5b85f9]  bg-[#1D4ED8] p-3 text-2xl"
          to={"/login"}
        >
          Login
        </Link>
        <Link
          className="w-[200px] rounded-[30px] text-center hover:bg-[#5b85f9]  bg-[#1D4ED8] p-3 text-2xl"
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
