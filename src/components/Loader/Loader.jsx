"use client";

import React from "react";
import { UserContext } from "@/context/UserContext";
import { CSSTransition } from "react-transition-group";
import "@/styles/Loader/CustomLoader.scss";

const Loading = ({ showMe = false }) => {
  return (
    <CSSTransition in={showMe} timeout={300} classNames="fade" unmountOnExit>
      <div className="customLoader fade-content">
        <div className="customLoader__content"></div>
        <small className="customLoader__text">Por favor, aguarde.</small>
      </div>
    </CSSTransition>
  );
};

export default Loading;
