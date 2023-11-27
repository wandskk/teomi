"use client";

import jwtDecode from "jwt-decode";
import React from "react";
import io from "socket.io-client";
import person from "@/assets/images/icons/person.png";
import Image from "next/image";
import Quiz from "../../../components/Quiz/Quiz";
import Link from "next/link";
import { ChatServices } from "@/services/modules/chat";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { LuSendHorizonal } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { FiAlertOctagon } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AttendantServices } from "@/services/modules/attendant";
import { UserContext } from "@/context/UserContext";
import "./page.scss";

const SOCKET_API_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL;

const Chat = ({ params }) => {
  const { userData, userDataDecode } = React.useContext(UserContext);
  const [socket, setSocket] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [messagesGroup, setMessagesGroup] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [attendantData, setAttendantData] = React.useState(null);
  const [canShowQuiz, setCanShowQuiz] = React.useState(false);
  const [quizResult, setQuizResult] = React.useState(null);
  const [finishChat, setFinishChat] = React.useState(false);
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const chatId = params.slug[0];
  const receiverId = params.slug[1];
  const formRef = React.useRef(null);

  const getAttendantData = React.useCallback(async (receiverId, connectID) => {
    try {
      const data = await AttendantServices.getAttendantData(
        receiverId,
        connectID
      );
      setAttendantData(data[0]);
    } catch (error) {}
  }, []);

  const getAllMessages = React.useCallback(async (chatId) => {
    try {
      const allMessages = await ChatServices.getAllMessages(chatId, connectID);
      setMessages(allMessages);
    } catch (error) {
      if (error.response.status === 409) setFinishChat(true);
    }
  }, []);

  const getChatQuiz = React.useCallback(async (chatId) => {
    try {
      const quiz = await ChatServices.getQuizChat(chatId, connectID);
      quiz.answered === 0 && setCanShowQuiz(true);
    } catch (error) {}
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);

    if (message) {
      socket.emit("chatMessage", {
        sender_id: decodeUser ? +decodeUser.userId : connectID,
        receiver_id: +receiverId,
        chatId,
        message: message,
      });
      setMessage("");
    }
  };

  function divideMessagesBySenderId(messages) {
    const dividedMessages = [];
    let currentGroup = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if (i === 0 || message.sender_id === messages[i - 1].sender_id) {
        currentGroup.push(message);
      } else {
        dividedMessages.push(currentGroup);
        currentGroup = [message];
      }
    }

    dividedMessages.push(currentGroup);

    setMessagesGroup(dividedMessages);
  }

  React.useEffect(() => {
    getAllMessages(chatId);
  }, [getAllMessages]);

  React.useEffect(() => {
    getChatQuiz(chatId);
  }, [getChatQuiz]);

  React.useEffect(() => {
    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);

    const newSocket = io(SOCKET_API_URL);
    setSocket(newSocket);

    newSocket.on("chatMessages", (message) => {
      if (message.chatId == chatId)
        setMessages((messages) => [...messages, message]);
    });

    newSocket.on("quizToPatientSession", (data) => {
      if (data.chatId == chatId) setCanShowQuiz(true);
    });

    newSocket.on("quizResultCallback", (data) => {
      if (data.chatId == chatId) {
        setCanShowQuiz(false);
        setQuizResult(null);
      }
    });

    newSocket.on("finishedChat", (data) => {
      if (data.chatId == chatId) setFinishChat(true);
    });

    newSocket.on("finishedService", (data) => {
      if (data.chatId == chatId) window.location.href = "/";
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if ((receiverId, connectID)) getAttendantData(+receiverId, connectID);
  }, [getAttendantData, receiverId, connectID]);

  React.useEffect(() => {
    if (messages.length > 0) divideMessagesBySenderId(messages);
  }, [messages]);

  React.useEffect(() => {
    if (quizResult) {
      const quizBody = {
        chatId,
        finalPoints: quizResult,
      };

      socket.emit("quizResult", quizBody);
    }
  }, [quizResult]);

  return (
    <div className="container">
      <div className="chat">
        {attendantData && (
          <div className="chat__info">
            <div className="chat__info__text">
              <small>{attendantData?.attendantRole}</small>
              <p>{attendantData?.attendantName}</p>
              <small>
                {attendantData?.attendantCity} /{" "}
                {attendantData?.attendantStateTag}
              </small>
            </div>
            <div className="chat__info__photo">
              <Image
                src={attendantData.attendantPhoto}
                alt="atendente"
                width={64}
                height={64}
              />
            </div>
          </div>
        )}
        {canShowQuiz && <Quiz result={setQuizResult} />}

        {!finishChat && !canShowQuiz && messagesGroup.length > 0 && (
          <div className="chat__messages">
            {messagesGroup &&
              messagesGroup.map((msg, index) => {
                const isReciver = msg[0].receiver_id == receiverId;
                const messageClass = !isReciver ? "--left" : "--right";
                const isChatService = msg[0].sender_id == "93";
                const userId = userData ? userData.id : connectID;
                if (isChatService) {
                  return (
                    <div key={index} className="chat__box --chatService">
                      <ul>
                        {msg.map((message, index) => {                          
                          if (userId === message.receiver_id)
                            return (
                              <li key={index}>
                                <FiAlertOctagon /> {message.message}
                              </li>
                            );
                        })}
                      </ul>
                    </div>
                  );
                }
                return (
                  <div key={index} className={`chat__box ${messageClass}`}>
                    {msg[0]?.sender_id == receiverId ? (
                      attendantData && (
                        <Image
                          className="chat__photo"
                          src={attendantData?.attendantPhoto}
                          alt="profile"
                          width={42}
                          height={42}
                        />
                      )
                    ) : (
                      <Image
                        src={userData ? userData.userphoto : person}
                        className="chat__photo"
                        width={42}
                        height={42}
                        alt="profile"
                      />
                    )}
                    <ul className={`chat__message ${messageClass}`}>
                      {msg &&
                        msg.map((message) => {
                          return (
                            <li key={message.messageId}>{message.message}</li>
                          );
                        })}
                    </ul>
                  </div>
                );
              })}
          </div>
        )}

        {finishChat && (
          <div className="chat__finished">
            <div className="chat__finished__marker"></div>
            <MdOutlineCalendarMonth />
            <h3>Atendimento finalizado</h3>
            <p>Escolha o tipo de atendimento</p>
            <div className="chat__finished__actions">
              <Link
                href={
                  userData
                    ? "/scheduling/online"
                    : "/login?backToLink=scheduling-online"
                }
              >
                Online
              </Link>
              <Link
                href={
                  userData
                    ? "/scheduling/inPerson"
                    : "/login?backToLink=scheduling-inPerson"
                }
              >
                Presencial
              </Link>
            </div>
            <Link href="/" className="chat__finished__quit">
              Desejo sair
            </Link>
          </div>
        )}

        {!finishChat && (
          <form onSubmit={sendMessage} className="chat__form" ref={formRef}>
            <button className="chat__form__button">
              <GrAdd />
            </button>
            <input
              className="chat__form__input"
              type="text"
              placeholder="Digite aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="chat__form__button" type="submit">
              <LuSendHorizonal />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
