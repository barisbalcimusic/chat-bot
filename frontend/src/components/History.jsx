import { useEffect, useRef } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { getAllMessages } from "../utils/getAllMessages";
import { useLoginContext } from "../contexts/LoginContext";
import { useSubmitContext } from "../contexts/SubmitContext";

const History = () => {
  const { chatDB, setchatDB, chatSS, setChatSS } = useChatContext();
  const { loggedIn } = useLoginContext();
  const { submitted } = useSubmitContext();
  const historyRef = useRef();

  useEffect(() => {
    if (loggedIn) {
      //DELETE ALL MESSAGES FROM SESSION STORAGE
      setChatSS(null);
      //GET ALL MESSAGES FROM DB AND SET AS STATE //!NOT OPTIMAL
      getAllMessages()
        .then((messages) => setchatDB(messages) || [])
        .catch((e) => {
          console.log(e);
        });
    } else {
      //GET ALL MESSAGES FROM SESSION STORAGE
      const messagesFromSS = JSON.parse(
        sessionStorage.getItem("messageHistory")
      );
      setChatSS(messagesFromSS || []);
    }
  }, [submitted]);

  useEffect(() => {
    //AUTO SCROLL TO BOTTOM
    const historyDiv = historyRef.current;
    historyDiv.scrollTop = historyDiv.scrollHeight;
    console.log(historyDiv.scrollHeight);
  }, [chatDB, chatSS]);

  return (
    <div
      ref={historyRef}
      id="history-div"
      className="flex flex-col items-center gap-8 p-5 overflow-y-auto"
    >
      {loggedIn
        ? chatDB.map((message, index) => (
            <p
              key={index}
              className={
                (message.type === "answer" &&
                  "bg-[#D7FFE0] p-4 w-[40%] rounded-[20px]") ||
                (message.type === "question" &&
                  "bg-[#D8E0FF] p-4 w-[40%] rounded-[20px]")
              }
            >
              {message.message}
            </p>
          ))
        : chatSS.map((message, index) => (
            <p
              key={index}
              className={
                (message.type === "answer" &&
                  "bg-[#D7FFE0] p-4 w-[40%] rounded-[20px]") ||
                (message.type === "question" &&
                  "bg-[#D8E0FF] p-4 w-[40%] rounded-[20px]")
              }
            >
              {message.message}
            </p>
          ))}
    </div>
  );
};

export default History;
