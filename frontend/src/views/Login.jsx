import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <form
      className="w-screen h-screen flex flex-col justify-center items-center gap-5 p-5 bg-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold mb-[30px]">Login</h1>
      <input
        value={email}
        type="email"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Email adress"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="text"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-[300px] p-3 bg-[#9FC1BF] hover:bg-[#C5E7E5] border-gray-400 rounded-[10px] "
      >
        send
      </button>
      <div className="flex gap-2">
        <p>Don't have an account?</p>
        <Link to={"/register"} className="text-blue-700 font-bold">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Login;
