import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ChatProvider from "./contexts/ChatContext";
import LoginProvider from "./contexts/LoginContext";
import SubmitProvider from "./contexts/SubmitContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <ChatProvider>
      <SubmitProvider>
        <App />
      </SubmitProvider>
    </ChatProvider>
  </LoginProvider>
);
