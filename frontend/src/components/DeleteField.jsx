import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { useChatContext } from "../contexts/ChatContext";
import { deleteAccount } from "../utils/deleteAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const DeleteField = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { user, setUser } = useLoginContext();
  const { setMessages } = useChatContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    //DELETE USER
    deleteAccount({ userId: user.userId, password: passwordValue }).then(() => {
      setUser(null);
      setMessages([]);
    });
  };

  return (
    <div className="settings w-full flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 p-4">
        <p className="w-full text-center">
          Please enter your password to delete your account:
        </p>
        <div className="w-full flex justify-end items-center relative">
          <input
            value={passwordValue}
            type={passwordHidden ? "password" : "text"}
            onChange={(e) => setPasswordValue(e.target.value)}
            className="w-full p-2 pr-10"
            placeholder="Password"
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
        <button type="submit" className="w-full button p-1">
          delete
        </button>
      </form>
    </div>
  );
};

export default DeleteField;
