import { Link } from "react-router-dom";

const Register = () => {
  return (
    <form className="w-screen h-screen flex flex-col justify-center items-center gap-5 p-5 bg-white">
      <h1 className="text-4xl font-bold mb-[30px]">Register</h1>
      <input
        type="email"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Email adress"
      />
      <input
        type="text"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Password"
      />
      <button
        type="submit"
        className="w-[300px] p-3 bg-[#9FC1BF] hover:bg-[#C5E7E5] border-gray-400 rounded-[10px] "
      >
        send
      </button>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to={"/login"} className="text-blue-700 font-bold">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
