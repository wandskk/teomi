"use client";

import React from "react";
import io from "socket.io-client";
import { UserContext } from "@/context/UserContext";
import "./page.scss";

const SOCKET_API_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL;

const Page = ({ params }) => {
  const { userDataDecode, connectID } = React.useContext(UserContext);

  React.useEffect(() => {
    const socket = io(SOCKET_API_URL);
    
    socket.on("chatReady", (data) => {
      const userId = userDataDecode ? userDataDecode.userId : connectID;

      if (data.patientId === userId) {
        const messageContent = "Chat iniciado com sucesso!";

        socket.emit("chatMessageWithService", {
          messageReceiver: data.attendantId,
          messageContent,
          chatId: data.chatId,
        });
        socket.emit("chatMessageWithService", {
          messageReceiver: data.patientId,
          messageContent,
          chatId: data.chatId,
        });
        window.location.href = `/chat/${data.chatId}/${data.attendantId}`;
      }
    });

    socket.on("deletedUserFromQueue", (data) => {
      const currentPatientId = userDataDecode
        ? userDataDecode.userId
        : connectID;

      if (data.attendantId == params.id && data.patientId == currentPatientId) {
        window.location.href = "/?queueEnd=true";
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="queue">
      <h1 className="queue__title">Aguarde</h1>
      <div className="queue__loader"></div>
      <p className="queue__text">estamos contactando um profissional</p>
    </div>
  );
};

export default Page;
