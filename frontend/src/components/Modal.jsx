import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { deleteAccount } from "../utils/deleteAccount";
import Settings from "./Settings";

const Modal = () => {
  const { setLoggedIn } = useLoginContext();
  const { user } = useLoginContext();
  const [settingsOpened, setSettingsOpened] = useState();

  const handleDelete = () => {
    setLoggedIn(false);
    deleteAccount(user).then((data) => console.log(data));
  };

  const handleSettings = () => {
    setSettingsOpened((value) => !value);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-500 absolute left-0 top-0">
      <div className="w-[300px] bg-blue-300 flex flex-col justify-center items-center p-10">
        <p className="p-">Hello, {user}</p>
        <ul className="w-full bg-gray-400">
          <li
            onClick={handleSettings}
            className="text-center hover:bg-slate-200 hover:cursor-pointer font-bold p-3"
          >
            Edit Profile
          </li>
          {settingsOpened && (
            <li>
              <Settings />
            </li>
          )}
          <li
            onClick={handleDelete}
            className="text-center hover:bg-slate-200 hover:cursor-pointer font-bold p-3"
          >
            Delete Account
          </li>
          <li className="text-center hover:bg-slate-200 hover:cursor-pointer font-bold p-3">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
