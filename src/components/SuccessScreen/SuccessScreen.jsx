import React from "react";
import Link from "next/link";
import Image from "next/image";
import SuccessIcon from "@/assets/images/icons/success.svg";
import "@/styles/SuccessScreen/SuccessScreen.scss";

const SuccessScreen = ({ text, subtext = null, link, linkText }) => {
  return (
    <div className="successScreen">
      <h1 className="successScreen__title">{text}</h1>
      {subtext && <p className="successScreen__subtext">{subtext}</p>}
      <div className="successScreen__icon">
        <Image src={SuccessIcon} alt="icone de sucesso" />
      </div>
      <Link className="successScreen__link" href={link}>
        {linkText}
      </Link>
    </div>
  );
};

export default SuccessScreen;
