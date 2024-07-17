import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/register";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [warning, setWarning] = useState(false);
  const recaptcha = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //CLEAR SPACES
    const email = emailValue.trim();
    const password = passwordValue.trim();
    //GET CAPTCHA VALUE
    const captchaValue = recaptcha.current.getValue();
    //SEND USER DATA AND CAPTCHA VALUE TO REGISTER FUNCTION
    register({ email, password, captchaValue }).then((data) => {
      //IF REGISTRATION INVALID SET THE WARNING, ELSE DEACTIVATE
      if (data.error) {
        console.log(data);
        setWarning(data.error);
      } else {
        setWarning(false);
        navigate("/login");
      }
    });
  };

  return (
    <form
      className="w-screen h-screen flex flex-col justify-center items-center gap-5 p-5 bg-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold mb-[30px]">Register</h1>
      <input
        value={emailValue}
        type="text"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Email adress"
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        value={passwordValue}
        type="text"
        className="w-[300px] p-3 placeholder:italic border border-gray-400 rounded-[10px] "
        placeholder="Password"
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      {warning && (
        <p className="text-red-500">
          {warning === "EmptyInput"
            ? "Email or password must'n be empty"
            : warning === "AlreadyRegistered"
            ? "This email adress is already registered"
            : warning === "InvalidEmailValueFormat"
            ? "The email format is invalid"
            : warning === "InvalidLength"
            ? "The password must be longer than 8 characters"
            : warning === "InvalidCaptcha"
            ? "Please verify the captcha to proceed."
            : null}
        </p>
      )}
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
      <ReCAPTCHA
        ref={recaptcha}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </form>
  );
};

export default Register;
