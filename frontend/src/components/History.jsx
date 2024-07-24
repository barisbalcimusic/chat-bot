import { useEffect, useRef } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { getConversation } from "../utils/getConversation";
import { createConversation } from "../utils/createConversation";
import { useLoginContext } from "../contexts/LoginContext";
import { TypeAnimation } from "react-type-animation";
import robot from "../assets/robot.png";

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
        const messageStyle =
          "w-[90%] max-w-[800px] px-2 py-4 lg:px-3 lg:py-5 flex items-center gap-3 lg:gap-3 rounded-[10px] shadow-lg shadow-gray-700";

        //IF MESAGE TYPE IS QUESTION...
        if (message.type === "question") {
          return (
            //...SHOW QUESTION WITHOUT TYPING ANIMATION
            <div key={index} className={`question-div ${messageStyle}`}>
              <div className="profil-pic w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] text- flex justify-center items-center rounded-full p-2 overflow-hidden shadow-md shadow-gray-500">
                <p className="font-bold text-xl lg:text-3xl">
                  {user.email[0].toUpperCase()}
                </p>
              </div>
              <p>{message.message}</p>
            </div>
          );
        }

        //IF MESAGE TYPE IS ANSWER...
        if (message.type === "answer") {
          //...AND TYPE ANIMATION STATE IS TRUE AND IT IS THE LAST ANSWER
          if (typeAnimation && array.length - 1 === index) {
            return (
              //...SHOW ANSWER WITH TYPING ANIMATION
              <div key={index} className={`answer-div ${messageStyle}`}>
                <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white rounded-full p-2 overflow-hidden shadow-md shadow-gray-500">
                  <img
                    src={robot}
                    className="w-[50px] h-[50px] lg:w-[85px] lg:h-[85px] object-cover"
                  />
                </div>
                <p>
                  <TypeAnimation
                    sequence={message.message}
                    speed={40}
                    repeat={0}
                    cursor={false}
                    className="answer"
                  />
                </p>
              </div>
            );
            //...OTHERWISE...
          } else {
            return (
              //...SHOW ANSWER WITHOUT TYPING ANIMATION
              <div key={index} className={`answer-div ${messageStyle}`}>
                <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white  rounded-full p-2 overflow-hidden shadow-md shadow-gray-500">
                  <img
                    src={robot}
                    className="w-[50px] h-[50px] lg:w-[85px] lg:h-[85px] object-cover"
                  />
                </div>
                <p className="answer">{message.message}</p>
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

export default History;
