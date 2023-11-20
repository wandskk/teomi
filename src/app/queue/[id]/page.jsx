"use client";

import React from "react";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { ChatServices } from "@/services/modules/chat";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { useSearchParams } from "next/navigation";
import "./page.scss";

const page = ({ params }) => {
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const searchParams = useSearchParams();
  const search = searchParams.get("isScheduled");

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
    const socket = io("http://142.4.192.167:3001");

    socket.on("chatReady", (data) => {
      let decodeUser = { id: null };
      if (userLogin) decodeUser = jwtDecode(userLogin);

      if (
        data.attendantId == params.id &&
        (data.patientId === decodeUser.userId || data.patientId == connectID)
      ) {
        window.location.href = `/chat/${data.chatId}/${data.attendantId}`;
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

export default page;
