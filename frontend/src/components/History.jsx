import { useEffect, useRef } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { getConversation } from "../utils/getConversation";
import { createConversation } from "../utils/createConversation";
import { useLoginContext } from "../contexts/LoginContext";
import { TypeAnimation } from "react-type-animation";

const History = () => {
  const { user } = useLoginContext();
  const { messages, setMessages, setCounter, typeAnimation, setTypeAnimation } =
    useChatContext();
  const historyRef = useRef();

  useEffect(() => {
    setTypeAnimation(false);
    setCounter(0);

    //GET ALL MESSAGES & SET AS STATE WHEN USER IS LOGGED IN
    const fetchMessages = async () => {
      try {
        const conversation = await getConversation(user.userId);
        //IF THERE IS A CONVERSATION
        if (conversation) {
          setCounter(conversation.messages.length);
          //SET MESSAGES INTO STATE VARIABLE
          setMessages(conversation.messages);
          //IF THERE IS NO CONVERSATION
        } else {
          //CREATE A NEW CONVERSATION
          await createConversation(user.userId);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  useEffect(() => {
    //AUTO SCROLL TO BOTTOM
    const historyDiv = historyRef.current;
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={historyRef}
      id="history-div"
      className="flex flex-col items-center gap-2 lg:gap-5 p-3 pt-12 overflow-y-auto mb-[100px]"
    >
      {messages.map((message, index, array) => {
        //COMMON STYLES
        const messageStyle = "w-[90%] max-w-[800px] p-4 lg:p-5 rounded-[10px]";

        //IF MESAGE TYPE IS QUESTION...
        if (message.type === "question") {
          return (
            //...SHOW QUESTION WITHOUT TYPING ANIMATION
            <p key={index} className={`question ${messageStyle}`}>
              {message.message}
            </p>
          );
        }

        //IF MESAGE TYPE IS ANSWER...
        if (message.type === "answer") {
          //...AND TYPE ANIMATION STATE IS TRUE AND IT IS THE LAST ANSWER
          if (typeAnimation && array.length - 1 === index) {
            return (
              //...SHOW ANSWER WITH TYPING ANIMATION
              <TypeAnimation
                key={index}
                className={`answer ${messageStyle}`}
                sequence={message.message}
                speed={40}
                repeat={0}
                cursor={false}
              />
            );
            //...OTHERWISE...
          } else {
            return (
              //...SHOW ANSWER WITHOUT TYPING ANIMATION
              <p key={index} className={`answer ${messageStyle}`}>
                {message.message}
              </p>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

export default History;
