import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { useChatContext } from "../contexts/ChatContext";
import { deleteAccount } from "../utils/deleteAccount";

const DeleteField = () => {
  const [passwordValue, setPasswordValue] = useState(null);
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <label className="flex flex-col">
          Password:
          <input
            value={passwordValue}
            type="text"
            onChange={(e) => setPasswordValue(e.target.value)}
            className="p-2"
          />
        </label>
        <button type="submit" className="button p-1">
          delete
        </button>
      </form>
    </div>
  );
};

export default DeleteField;
