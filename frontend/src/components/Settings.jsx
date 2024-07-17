import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { editProfile } from "../utils/editProfile";

const Settings = () => {
  const { user, setUser } = useLoginContext();
  const [newEmail, setNewEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    //UPDATE USER INFO
    editProfile(user, newEmail).then((data) => {
      //IF SUCCESS
      if (data) {
        //EMPTY USER STATE
        setUser(null);
      }
    });
  };

  return (
    <div className="settings w-full flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <label className="flex flex-col">
          Email:
          <input
            onChange={(e) => setNewEmail(e.target.value)}
            type="text"
            value={newEmail}
            className="p-2"
          />
        </label>
        <button type="submit" className="button p-1">
          save
        </button>
      </form>
    </div>
  );
};

export default Settings;
