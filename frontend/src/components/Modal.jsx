import { useLoginContext } from "../contexts/LoginContext";
import { deleteAccount } from "../utils/deleteAccount";

const Modal = () => {
  const { setLoggedIn } = useLoginContext();
  const { user } = useLoginContext();
  const handleDelete = () => {
    setLoggedIn(false);
    deleteAccount(user).then((data) => console.log(data));
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-500 absolute left-0 top-0">
      <div className="w-[300px] bg-blue-300 flex flex-col justify-center items-center">
        <p className="p-">Hello, {user}</p>
        <ul className="w-full bg-gray-400">
          <li className="text-center hover:bg-slate-200 hover:cursor-pointer font-bold p-3">
            Edit Profile
          </li>
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
