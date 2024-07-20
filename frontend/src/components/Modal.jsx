import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { deleteAccount } from "../utils/deleteAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../utils/logout";
import { useChatContext } from "../contexts/ChatContext";
import EditField from "./EditField";
import DeleteField from "./DeleteField";

const Modal = ({ setModal }) => {
  const { user, setUser } = useLoginContext();
  const [editFieldOpened, setEditFieldOpened] = useState(false);
  const [deleteFieldOpened, setDeleteFieldOpened] = useState(false);
  const { setMessages } = useChatContext();

  //CHANGE VISIBILTY OF EDIT FIELD
  const handleEdit = () => {
    setEditFieldOpened((value) => !value);
    if (deleteFieldOpened) {
      setDeleteFieldOpened((value) => !value);
    }
  };

  //CHANGE VISIBILTY OF DELETE FIELD
  const handleDelete = () => {
    setDeleteFieldOpened((value) => !value);
    if (editFieldOpened) {
      setEditFieldOpened((value) => !value);
    }
  };

  //LOGOUT USER
  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      setMessages([]);
    });
  };

  return (
    <div className="modal w-screen h-screen flex flex-col justify-center items-center absolute z-10 left-0 top-0">
      <div className="settings-div w-[90%] max-w-[600px] flex flex-col gap-5 justify-center items-center p-10 relative rounded-[10px]">
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={faX}
          className="absolute top-3 right-3 text-3xl hover:text-red-600 hover:cursor-pointer"
        />
        <div>
          <p className="text-3xl">Hello,</p>
          <p className="text-3xl font-bold">{user && user.email}</p>
        </div>
        <ul className="w-full flex flex-col items-center gap-2">
          <li
            onClick={handleEdit}
            className="setting w-full max-w-[300px] text-center hover:cursor-pointer font-bold p-3"
          >
            Edit Profile
          </li>
          {editFieldOpened && (
            <li className="w-full max-w-[300px]">
              <EditField />
            </li>
          )}
          <li
            onClick={handleDelete}
            className="setting w-full max-w-[300px] text-center hover:cursor-pointer font-bold p-3"
          >
            Delete Account
          </li>
          {deleteFieldOpened && (
            <li className="w-full max-w-[300px]">
              <DeleteField />
            </li>
          )}
          <li
            onClick={handleLogout}
            className="setting w-full max-w-[300px] text-center hover:cursor-pointer font-bold p-3"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
