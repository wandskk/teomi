"use client";

import jwtDecode from "jwt-decode";
import React, { useEffect, useState, useCallback, useContext } from "react";
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
  const [chatStarted, setChatStarted] = useState(false);
  const { userData, setLoading } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [canShowQuizButton, setCanShowQuizButton] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesGroup, setMessagesGroup] = useState([]);
  const [message, setMessage] = useState("");
  const [patientData, setPatientData] = useState(null);
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const [showMenu, setShowMenu] = useState(false);
  const chatId = params.slug[0];
  const receiverId = params.slug[1];

  const getPatientData = useCallback(
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

  const getAllMessages = useCallback(
    async (chatId) => {
      try {
        const allMessages = await ChatServices.getAllMessages(
          chatId,
          connectID
        );
        setMessages(allMessages || []);
      } catch (error) {
        console.error(error);
      }
    },
    [connectID]
  );

  useEffect(() => {
    getAllMessages(chatId);
  }, [getAllMessages, chatId]);

  useEffect(() => {
    const newSocket = io(SOCKET_API_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    let decodeUser = { id: null };
    if (userLogin) decodeUser = jwtDecode(userLogin);

    if (socket) {
      socket.on("chatMessages", (message) => {
        if (message.chatId === chatId) {
          setMessages((messages) => [...messages, message]);
        }
      });

      socket.on("finishedChat", (data) => {
        if (data.chatId === chatId) {
          window.location.href = "/";
        }
      });

      socket.on("finishedService", (data) => {
        if (data.chatId === chatId) {
          window.location.href = "/";
        }
      });

      socket.on("quizResultCallback", (data) => {
        if (data.chatId === chatId) {
          socket.emit("chatMessageWithService", {
            messageReceiver: decodeUser.userId,
            messageContent: `Quiz finalizado! A pontuação foi de ${data.finalPoints} pontos`,
            chatId,
          });

          socket.emit("chatMessageWithService", {
            messageReceiver: receiverId,
            messageContent: "Quiz finalizado!",
            chatId,
          });
        }

        setCanShowQuizButton(true);
      });
    }
  }, [socket, userLogin, chatId, receiverId]);

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
      chatId,
    });
  };

  const sendPatientToHome = () => {
    socket.emit("finishService", {
      chatId,
    });
  };

  useEffect(() => {
    if (receiverId && connectID) {
      getPatientData(receiverId, connectID);
    }
  }, [getPatientData, receiverId, connectID]);

  useEffect(() => {
    if (messages.length > 0) {
      divideMessagesBySenderId(messages);
    }
  }, [messages]);

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
