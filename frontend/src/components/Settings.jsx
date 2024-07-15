import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { editProfile } from "../utils/editProfile";

const Settings = () => {
  const { user, setUser, setLoggedIn } = useLoginContext();
  const [newEmail, setNewEmail] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    //UPDATE USER INFO
    editProfile(user, newEmail).then((data) => {
      //IF SUCCESS
      if (data) {
        //EMPTY USER STATE
        setUser(null);
        //LOGOUT
        setLoggedIn(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="">
        <label>
          Email:
          <input
            onChange={(e) => setNewEmail(e.target.value)}
            type="text"
            value={newEmail}
          />
        </label>
        <button type="submit" className="bg-red-300">
          save
        </button>
      </form>
    </div>
  );
};

export default Settings;
