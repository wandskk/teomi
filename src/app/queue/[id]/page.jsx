"use client";

import React from "react";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { ChatServices } from "@/services/modules/chat";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import "./page.scss";

const SOCKET_API_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL;

const Page = ({ params }) => {
  const userLogin = getCookie("userLogin");
  const searchParams = useSearchParams();
  const search = searchParams.get("isScheduled");
  const { userDataDecoded, connectID } = React.useContext(UserContext);

  const postUserInQueue = React.useCallback(
    async (data, attendantId, connectID) => {
      try {
        const isScheduled = search ? 1 : null;
        const queue = await ChatServices.postUserInQueue(
          { ...data, attendantId: +attendantId, isScheduled },
          connectID
        );
      } catch (error) {}
    },
    []
  );

  React.useEffect(() => {
    const socket = io(SOCKET_API_URL);

    socket.on("chatReady", (data) => {
      const userId = userDataDecoded ? userDataDecoded.userId : connectID;

      if (data.attendantId == params.id && data.patientId === userId) {
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
      const currentPatientId = userDataDecoded
        ? userDataDecoded.userId
        : connectID;

      if (data.attendantId == params.id && data.patientId == currentPatientId) {
        window.location.href = "/?queueEnd=true";
      }
    });

    return () => socket.disconnect();
  }, []);

  React.useEffect(() => {
    if (connectID) {
      if (userLogin) {
        const decodeUser = jwtDecode(userLogin);

        postUserInQueue(
          { userData: decodeUser.userUniqueId },
          params.id,
          connectID
        );
      } else {
        postUserInQueue({ userData: connectID }, params.id, connectID);
      }
    }
  }, [postUserInQueue]);

  return (
    <div className="queue">
      <h1 className="queue__title">Aguarde</h1>
      <div className="queue__loader"></div>
      <p className="queue__text">estamos contactando o profissional</p>
    </div>
  );
};

export default Page;
