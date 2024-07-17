import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 bg-black text-white justify-center items-center">
      <h1 className="text-5xl font-bold">Let's chat!</h1>
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
