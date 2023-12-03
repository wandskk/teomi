"use client";

import jwtDecode from "jwt-decode";
import React from "react";
import io from "socket.io-client";
import person from "@/assets/images/icons/person.png";
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
import { separateTextAndProcessYouTubeLink } from "@/resources/helpers/chat/separateTextAndProcessYouTubeLink";
import Link from "next/link";

const SOCKET_API_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL;

const Chat = ({ params }) => {
  const { userData, setLoading, userDataDecode } =
    React.useContext(UserContext);
  const [socket, setSocket] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [messagesGroup, setMessagesGroup] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [patientData, setPatientData] = React.useState(null);
  const [showMenu, setShowMenu] = React.useState(false);
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const chatId = params.slug[0];
  const receiverId = params.slug[1];

  const getPatientData = React.useCallback(
    async (receiverId, connectID) => {
      setLoading(true);
      try {
        const data = await PatientServices.getPatientDataById(
          receiverId,
          connectID
        );
        setPatientData(data[0] || null);
      } catch (error) {
        setPatientData(null);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const getAllMessages = React.useCallback(async (chatId) => {
    try {
      const userId = userDataDecode?.userId ?? connectID;

      const allMessages = await ChatServices.getAllMessages(
        +chatId,
        userId,
        connectID
      );

      setMessages(allMessages);
    } catch (error) {
      const status = error.response?.status;
      if (status === 400 || status === 404 || status === 409)
        window.location.href = "/";
    }
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
  }, [getAllMessages, chatId]);

  React.useEffect(() => {
    const newSocket = io(SOCKET_API_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const newSocket = io(SOCKET_API_URL);
    setSocket(newSocket);

    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);

    if (newSocket) {
      newSocket.on("chatMessages", (message) => {
        if (message.chatId === chatId) {
          setMessages((messages) => [...messages, message]);
        }
      });

      newSocket.on("finishedChat", (data) => {
        if (data.chatId === +chatId) {
          window.location.href = "/";
        }
      });

      newSocket.on("finishedService", (data) => {
        if (data.chatId === +chatId) {
          window.location.href = "/";
        }
      });

      newSocket.on("quizResultCallback", (data) => {
        if (data.chatId === chatId) {
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
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let decodeUser = jwtDecode(userLogin);

    socket.emit("chatMessage", {
      sender_id: decodeUser.userId,
      receiver_id: receiverId,
      chatId,
      message: message,
    });
    setMessage("");
  };

  const sendQuiz = () => {
    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);
    const messageContent = "O quiz foi iniciado!";

    if (socket) {
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
    }
  };

  const finishChat = () => {
    socket.emit("finishChat", {
      chatId: +chatId,
    });
  };

  const sendPatientToHome = () => {
    socket.emit("finishService", {
      chatId: +chatId,
    });
  };

  React.useEffect(() => {
    if (receiverId && connectID) {
      getPatientData(receiverId, connectID);
    }
  }, [getPatientData, receiverId, connectID]);

  React.useEffect(() => {
    if (messages.length > 0) {
      divideMessagesBySenderId(messages);
    }
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
          <div
            style={{
              backgroundImage: `url(${
                patientData ? patientData.patientPhoto : person.src
              })`,
            }}
            className="chat__info__photo"
          />
        </div>
        {messagesGroup?.length > 0 && (
          <div className="chat__messages">
            {messagesGroup &&
              messagesGroup.map((msg, index) => {
                const isReciver = msg[0].receiver_id == receiverId;
                const messageClass = !isReciver ? "--left" : "--right";
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
                    {!isReciver ? (
                      patientData ? (
                        <div
                          className="chat__photo"
                          style={{
                            backgroundImage: `url(${
                              patientData.patientPhoto || person.src
                            })`,
                          }}
                        />
                      ) : (
                        <div
                          className="chat__photo"
                          style={{ backgroundImage: `url(${person.src})` }}
                        />
                      )
                    ) : (
                      <div
                        className="chat__photo"
                        style={{
                          backgroundImage: `url(${
                            userData ? userData.userphoto : person
                          })`,
                        }}
                      />
                    )}
                    <ul className={`chat__message ${messageClass}`}>
                      {msg &&
                        msg.map((message) => {
                          const messageObject =
                            separateTextAndProcessYouTubeLink(message.message);
                          return (
                            <li key={message.messageId}>
                              {/* Mensagem com link */}
                              {messageObject.link &&
                                !messageObject.isYouTubeLink && (
                                  <>
                                    <p>{messageObject.text}</p>
                                    <Link
                                      target="_blank"
                                      href={messageObject.link}
                                    >
                                      <p>{messageObject.link}</p>
                                    </Link>
                                  </>
                                )}

                              {/* Mensagem com youtube */}
                              {messageObject.isYouTubeLink && (
                                <>
                                  {messageObject.text && (
                                    <p>{messageObject.text}</p>
                                  )}
                                  <iframe
                                    src={messageObject.link}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                  ></iframe>
                                </>
                              )}

                              {/* Mensagem normal */}
                              {!messageObject.link &&
                                !messageObject.isYouTubeLink && (
                                  <>
                                    <p>{messageObject.text}</p>
                                  </>
                                )}
                            </li>
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
          <div
            className="chat__form__button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <GrAdd />
          </div>
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
