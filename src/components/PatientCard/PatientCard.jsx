import React from "react";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import "@/styles/PatientCard/PatientCard.scss";

const PatientCard = ({ patientData, type, onClick }) => {
  return (
    <div className={`patientCard`}>
      <div className={`patientCard__image`}>
        <Image
          src={patientData.patientPhoto}
          alt="perfil do paciente"
          width={64}
          height={64}
        />
      </div>
      <div className="patientCard__text">
        <p className="patientCard__text__name">
          <strong>{patientData.patientName}</strong>
        </p>
        {type === "waiting" && (
          <>
            <small className="patientCard__text__profession">
              {patientData.scheduleDate}
            </small>
            <small className="patientCard__text__profession">
              {patientData.scheduleStartTime}
            </small>
          </>
        )}
      </div>
      {type === "waiting" && (
        <button
          className={`patientCard__button`}
          onClick={() => onClick(patientData.scheduleId)}
        >
          Aceitar
        </button>
      )}
      {type === "scheduled" && (
        <button className={`patientCard__button`}>
          <CiCalendar />
          <div>
            <small className="patientCard__text__profession">
              {patientData.scheduleDate}
            </small>
            <small className="patientCard__text__profession">
              {patientData.scheduleStartTime}
            </small>
          </div>
        </button>
      )}
    </div>
  );
};

export default PatientCard;
