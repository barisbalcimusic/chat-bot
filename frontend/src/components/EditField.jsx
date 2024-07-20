import { useEffect, useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { editProfile } from "../utils/editProfile";
import { logout } from "../utils/logout";
import { useChatContext } from "../contexts/ChatContext";

const EditField = () => {
  const { user, setUser } = useLoginContext();
  const [newEmail, setNewEmail] = useState("");
  const { setMessages } = useChatContext();

  useEffect(() => {
    if (user) {
      setNewEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //UPDATE USER INFO
    editProfile(user.email, newEmail).then((data) => {
      //IF SUCCESS...
      if (data.status === "success") {
        //...LOGOUT USER
        logout().then(() => {
          setUser(null);
          setMessages([]);
        });
      }
    });
  };

  return (
    <div className="settings w-full flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <p>Please enter your new email adress to uptade:</p>
        <input
          onChange={(e) => setNewEmail(e.target.value)}
          type="text"
          value={newEmail}
          className="p-2"
          placeholder="Email adress"
        />
        <button type="submit" className="button p-1">
          update
        </button>
      </form>
    </div>
  );
};

export default EditField;
