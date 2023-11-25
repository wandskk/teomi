"use client";

import jwtDecode from "jwt-decode";
import React from "react";
import io from "socket.io-client";
import person from "@/assets/images/icons/person.png";
import Image from "next/image";
import Message from "@/components/Message/Message";
import { ChatServices } from "@/services/modules/chat";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { LuSendHorizonal } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { FiAlertOctagon } from "react-icons/fi";
import { GoDiscussionOutdated } from "react-icons/go";
import { SlChemistry } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "@/context/UserContext";
import { PatientServices } from "@/services/modules/patient";
import "./page.scss";

const SOCKET_API_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL;

const Chat = ({ params }) => {
  const [chatStarted, setChatStarted] = React.useState(false);
  const { userData, setLoading } = React.useContext(UserContext);
  const [socket, setSocket] = React.useState();
  const [canShowQuizButton, setCanShowQuizButton] = React.useState(true);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [messagesGroup, setMessagesGroup] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [patientData, setPatientData] = React.useState(null);
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const [showMenu, setShowMenu] = React.useState(false);
  const chatId = params.slug[0];
  const receiverId = params.slug[1];

  const getPatientData = React.useCallback(async (receiverId, connectID) => {
    setLoading(true);
    try {
      const data = await PatientServices.getPatientDataById(
        receiverId,
        connectID
      );
      setPatientData(data[0]);
    } catch (error) {
      setPatientData(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllMessages = React.useCallback(async (chatId) => {
    try {
      const allMessages = await ChatServices.getAllMessages(chatId, connectID);
      setMessages(allMessages);
    } catch (error) {}
  }, []);

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
    const newSocket = io(SOCKET_API_URL);
    setSocket(newSocket);
    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);

    newSocket.on("chatMessages", (message) => {
      if (message.chatId == chatId)
        setMessages((messages) => [...messages, message]);
    });

    newSocket.on("finishedChat", (data) => {
      if (data.chatId == chatId) window.location.href = "/";
    });

    newSocket.on("finishedService", (data) => {
      if (data.chatId == chatId) window.location.href = "/";
    });

    newSocket.on("quizResultCallback", (data) => {
      if (data.chatId == chatId) {

        newSocket.emit("chatMessageWithService", {
          messageReceiver: decodeUser.userId,
          messageContent: `Quiz finalizado! A pontuação foi de ${data.finalPoints} pontos`,
          chatId,
        });
    
        newSocket.emit("chatMessageWithService", {
          messageReceiver: receiverId,
          messageContent: "Quiz finalizado!",
          chatId,
        });        
      }

      setCanShowQuizButton(true);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);

    if (message) {
      socket.emit("chatMessage", {
        sender_id: decodeUser.userId ? decodeUser.userId : connectID,
        receiver_id: receiverId,
        chatId,
        message: message,
      });
      setMessage("");
    }
  };

  const sendQuiz = () => {
    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);
    const messageContent = "O quiz foi iniciado!";

    socket.emit("attendantSendQuiz", {
      attendantId: decodeUser.userId,
      patientId: receiverId,
      chatId,
    });

    socket.emit("chatMessageWithService", {
      messageReceiver: decodeUser.userId,
      messageContent,
      chatId,
    });

    socket.emit("chatMessageWithService", {
      messageReceiver: receiverId,
      messageContent,
      chatId,
    });

    setCanShowQuizButton(false);

    setShowMenu(false);
  };

  const finishChat = () => {
    socket.emit("finishChat", {
      chatId,
    });
  };

  const sendPatientToHome = () => {
    socket.emit("finishService", {
      chatId,
    });
  };

  React.useEffect(() => {
    if ((receiverId, connectID)) getPatientData(+receiverId, connectID);
  }, [getPatientData, receiverId, connectID]);

  React.useEffect(() => {
    if (messages.length > 0) divideMessagesBySenderId(messages);
  }, [messages]);

  return (
    <div className="container">
      {alertMessage && (
        <Message
          message={alertMessage.text}
          type={alertMessage.type}
          resetMessage={setAlertMessage}
        />
      )}
      <div className="chat">
        {patientData != null && (
          <div className="chat__info">
            <div className="chat__info__text">
              <small>Paciente</small>
              <p>{patientData ? patientData.patientName : "Anônimo"}</p>
              {patientData && (
                <small>
                  {patientData.patientCity} / {patientData.patientStateTag}
                </small>
              )}
            </div>
            <div className="chat__info__photo">
              <Image
                src={patientData ? patientData.patientPhoto : person}
                alt="atendente"
                width={64}
                height={64}
              />
            </div>
          </div>
        )}

        {messagesGroup.length > 0 && (
          <div className="chat__messages">
            {messagesGroup &&
              messagesGroup.map((msg, index) => {
                const isReciver = msg[0].receiver_id === receiverId;
                const messageClass = isReciver ? "--left" : "--right";
                const isChatService = msg[0].sender_id == 93;
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
                      patientData ? (
                        <Image
                          className="chat__photo"
                          src={patientData.patientPhoto}
                          alt="profile patient"
                          width={42}
                          height={42}
                        />
                      ) : (
                        <Image
                          className="chat__photo"
                          src={person}
                          alt="profile patient"
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
        <form onSubmit={sendMessage} className="chat__form">
          {showMenu && (
            <div className="chat__form__menu">
              <ul>
                <li onClick={sendQuiz}>
                  <SlChemistry />
                  Teste K10
                </li>

                <li onClick={finishChat}>
                  <GoDiscussionOutdated />
                  Atendimento
                </li>

                <li onClick={sendPatientToHome}>
                  <IoMdClose />
                  Finalizar
                </li>
              </ul>
            </div>
          )}
          <button
            className="chat__form__button"
            onClick={() => setShowMenu(!showMenu)}
          >
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
      </div>
    </div>
  );
};

export default Chat;
