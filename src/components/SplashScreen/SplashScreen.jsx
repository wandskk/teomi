"use client";

import React from "react";
import splashScreenImage from "@/assets/images/splashScreen.svg";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { CSSTransition } from "react-transition-group";
import "@/styles/SplashScreen/SplashScreen.scss";

const SplashScreen = () => {
  const { splashScreen } = React.useContext(UserContext);

  if (splashScreen)
    return (
      <CSSTransition
        in={splashScreen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="splashScreen fade-content">
          <Image priority={true} src={splashScreenImage} alt="Splash Screen" />
        </div>
      </CSSTransition>
    );
};

export default SplashScreen;
