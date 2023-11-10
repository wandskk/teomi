"use client";

import jwtDecode from "jwt-decode";
import React from "react";
import io from "socket.io-client";
import person from "@/assets/images/icons/person.png";
import Image from "next/image";
import { ChatServices } from "@/services/modules/chat";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { LuSendHorizonal } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { AttendantServices } from "@/services/modules/Attendant";
import "./page.scss";

const Chat = ({ params }) => {
  const [socket, setSocket] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [messagesGroup, setMessagesGroup] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [attedantData, setAttendantData] = React.useState(null);
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const chatId = params.slug[0];
  const receiverId = params.slug[1];

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
    const newSocket = io("http://142.4.192.167:3001");
    setSocket(newSocket);

    newSocket.on("chatMessages", (message) => {
      setMessages((messages) => [...messages, message]);
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

  React.useEffect(() => {
    if ((receiverId, connectID)) getAttendantData(+receiverId, connectID);
  }, [getAttendantData, receiverId, connectID]);

  React.useEffect(() => {
    divideMessagesBySenderId(messages);
  }, [messages]);

  return (
    <div className="container">
      <div className="chat">
        <div className="chat__info">
          <div className="chat__info__text">
            <small>{attedantData?.attendantRole}</small>
            <p>{attedantData?.attendantName}</p>
            <small>
              {attedantData?.attendantCity} / {attedantData?.attendantStateTag}
            </small>
          </div>
          <div className="chat__info__photo">
            <Image
              src={attedantData?.attendantPhoto}
              alt="atendente"
              width={64}
              height={64}
            />
          </div>
        </div>
        <div className="chat__messages">
          {messagesGroup &&
            messagesGroup.map((msg, index) => {
              const messageClass =
                msg[0]?.sender_id == receiverId ? "--left" : "--right";
              return (
                <div key={index} className={`chat__box ${messageClass}`}>
                  {msg[0]?.sender_id == receiverId ? (
                    <Image
                      className="chat__photo"
                      src={attedantData?.attendantPhoto}
                      alt="profile"
                      width={42}
                      height={42}
                    />
                  ) : (
                    <Image src={person} alt="profile" />
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
        <form onSubmit={sendMessage} className="chat__form">
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
      </div>
    </div>
  );
};

export default Chat;
