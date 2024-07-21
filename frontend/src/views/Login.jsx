import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/login";
import { useLoginContext } from "../contexts/LoginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [waiting, isWaiting] = useState(false);
  const { setUser } = useLoginContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    isWaiting(true);
    login({ email, password }).then((data) => {
      isWaiting(false);
      //IF LOGIN INVALID SET THE WARNING, ELSE DEACTIVATE
      if (data.error) {
        setWarning(data.error);
      } else {
        setWarning(false);
        setUser(data);
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
      <div className="flex justify-end items-center relative">
        <input
          value={password}
          type={passwordHidden ? "password" : "text"}
          className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          onClick={() => setPasswordHidden((value) => !value)}
          className="absolute right-3 hover:cursor-pointer hover:text-gray-400"
        >
          {passwordHidden ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </div>
      </div>
      {warning && (
        <p className="text-red-500 w-[300px] text-sm text-center">
          {warning === "EmptyInput"
            ? "Email or Password must'n be empty"
            : warning === "NotRegistered"
            ? "Invalid login data"
            : warning === "Unauthorized"
            ? "Invalid login data"
            : warning === "EmailNotVerified"
            ? "The email address hasn't been verified yet. Please verify it via the link we sent to you in order to log in."
            : null}
        </p>
      )}
      <button
        disabled={waiting ? true : false}
        type="submit"
        className="w-[300px] p-3 bg-[#9FC1BF] hover:bg-[#C5E7E5] border-gray-400 rounded-[10px] disabled:bg-gray-200"
      >
        {waiting ? <BeatLoader loading={true} size={10} /> : "send"}
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
