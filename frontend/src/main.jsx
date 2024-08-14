import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ChatProvider from "./contexts/ChatContext";
import LoginProvider from "./contexts/LoginContext";
import SubmitProvider from "./contexts/SubmitContext";
import ResponsivityProvider from "./contexts/ResponsivityContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ResponsivityProvider>
    <LoginProvider>
      <ChatProvider>
        <SubmitProvider>
          <App />
        </SubmitProvider>
      </ChatProvider>
    </LoginProvider>
  </ResponsivityProvider>
);
