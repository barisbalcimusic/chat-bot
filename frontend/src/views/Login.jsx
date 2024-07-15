import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/login";
import { useLoginContext } from "../contexts/LoginContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState(false);
  const [password, setPassword] = useState("");
  const { setUser, setLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).then((data) => {
      //IF LOGIN INVALID SET THE WARNING, ELSE DEACTIVATE
      if (data.error) {
        setWarning(data.error);
      } else {
        setWarning(false);
        setLoggedIn(true);
        setUser(data.email);
        navigate("/chat");
      }
    });
  };

  return (
    <form
      className="w-screen h-screen flex flex-col justify-center items-center gap-5 p-5 bg-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold mb-[30px]">Login</h1>
      <input
        value={email}
        type="text"
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
      {warning && (
        <p className="text-red-500">
          {warning === "EmptyInput"
            ? "Email or Password must'n be empty"
            : warning === "NotRegistered" || "Unauthorized"
            ? "Invalid login data"
            : ""}
        </p>
      )}
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
