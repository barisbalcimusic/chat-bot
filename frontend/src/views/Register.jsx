import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../utils/register";
import ReCAPTCHA from "react-google-recaptcha";
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [warning, setWarning] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [waitingMessageOn, setWaitingMessageOn] = useState(false);
  const [waiting, isWaiting] = useState(false);
  const recaptcha = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    isWaiting(true);
    setWarning(false);

    const timer = setTimeout(() => {
      setWaitingMessageOn(true);
    }, 5000);

    // TRIM & LOWERCASE EMAIL
    const email = emailValue.trim().toLowerCase();
    // TRIM PASSWORD
    const password = passwordValue.trim();
    // GET CAPTCHA VALUE
    const captchaValue = recaptcha.current.getValue();
    // SEND USER DATA AND CAPTCHA VALUE TO REGISTER FUNCTION
    register({ email, password, captchaValue })
      .then((data) => {
        // IF REGISTRATION INVALID SET THE WARNING, ELSE DEACTIVATE
        if (data.error) {
          setWarning(data.error);
          setRegisterMessage(null);
        } else {
          setWarning(false);
          setRegisterMessage(data.message);
          setEmailValue("");
          setPasswordValue("");
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
      <h1 className="text-4xl font-bold mb-[30px]">Register</h1>
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
            ? "Email or password must'n be empty"
            : warning === "AlreadyRegistered"
            ? "This email adress is already registered"
            : warning === "InvalidEmailFormat"
            ? "The email format is invalid"
            : warning === "InvalidLength"
            ? "The password must be longer than 8 characters"
            : warning === "InvalidCaptcha"
            ? "Please verify the captcha to proceed."
            : warning === "UnexpectedError"
            ? "An unexpected error occurred. Please try again later."
            : null}
        </p>
      )}
      {registerMessage && (
        <p className="text-green-600 text-sm w-[300px] text-center">
          {registerMessage}
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
        <p>Already have an account?</p>
        <Link to={"/login"} className="text-blue-700 font-bold">
          Login
        </Link>
      </div>
      <ReCAPTCHA
        ref={recaptcha}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </form>
  );
};

export default Register;
