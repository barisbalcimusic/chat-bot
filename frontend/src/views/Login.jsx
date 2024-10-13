import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/login";
import { useLoginContext } from "../contexts/LoginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [warning, setWarning] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [waitingMessageOn, setWaitingMessageOn] = useState(false);
  const [waiting, isWaiting] = useState(false);
  const { setUser } = useLoginContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    isWaiting(true);
    setWarning(false);

    const timer = setTimeout(() => {
      setWaitingMessageOn(true);
    }, 5000);

    // TRIM & LOWERCASE EMAIL
    const email = emailValue.trim().toLowerCase();
    login({ email, password: passwordValue })
      .then((data) => {
        // IF LOGIN INVALID SET THE WARNING, ELSE DEACTIVATE
        if (data.error) {
          setWarning(data.error);
        } else {
          setWarning(false);
          setUser(data);
          navigate("/chat");
        }
      })
      .catch((e) => {
        console.error(e);
        setWarning("UnexpectedError");
      })
      .finally(() => {
        isWaiting(false);
        clearTimeout(timer);
        setWaitingMessageOn(false);
      });
  };
  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center gap-5 p-5 bg-white"
      onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold mb-[30px]">Login</h1>
      <input
        value={emailValue}
        type="text"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Email adress"
        disabled={waiting}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <div className="flex justify-end items-center relative">
        <input
          value={passwordValue}
          type={passwordHidden ? "password" : "text"}
          className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
          placeholder="Password"
          disabled={waiting}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <div
          onClick={() => setPasswordHidden((value) => !value)}
          className="absolute right-3 hover:cursor-pointer hover:text-gray-400">
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
            : warning === "UnexpectedError"
            ? "An unexpected error occurred. Please try again later."
            : null}
        </p>
      )}
      {waitingMessageOn && (
        <p className="w-[300px] text-sm text-blue-700 text-justify">
          If the wait is long, the server may be waking from sleep due to
          inactivity. This can take up to 50 seconds. Thanks for your patience.
        </p>
      )}
      <button
        disabled={waiting ? true : false}
        type="submit"
        className="w-[300px] p-3 bg-[#9FC1BF] hover:bg-[#C5E7E5] border-gray-400 rounded-[10px] disabled:bg-gray-200">
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
