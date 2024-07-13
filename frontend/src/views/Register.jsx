import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/register";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ email, password }).then((data) => {
      //IF REGISTRATION INVALID SET THE WARNING, ELSE DEACTIVATE
      console.log(data);
      if (data.error) {
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
            : warning === "AlreadyRegistered"
            ? "This email adress is already registered"
            : warning === "InvalidEmailFormat"
            ? "The email format is invalid"
            : warning === "InvalidLength"
            ? "The password must be longer than 8 characters"
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
        <p>Already have an account?</p>
        <Link to={"/login"} className="text-blue-700 font-bold">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
