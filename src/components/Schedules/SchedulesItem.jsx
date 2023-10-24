import Image from "next/image";
import Link from "next/link";
import React from "react";
import professionalPhoto from "@/assets/images/professional.svg";
import { formatDate } from "@/resources/helpers/date/formatDate";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import "@/styles/Schedules/SchedulesItem.scss";

const SchedulesItem = ({ schedule }) => {
  const {
    id,
    professionalName,
    professionalType,
    date,
    startTime,
    endTime,
    link,
    // professionalPhoto,
  } = schedule;

  return (
    <div className="schedulesItem">
      <div className="schedulesItem__header">
        <div className="schedulesItem__header__photo">
          <Image src={professionalPhoto} alt="Foto do profissional" />
        </div>
        <div className="schedulesItem__header__details">
          <h2 className="schedulesItem__header__details__name">
            {professionalName}
          </h2>
          <p className="schedulesItem__header__details__type">
            {professionalType}
          </p>
        </div>
      </div>
      <div className="schedulesItem__content">
        <div className="schedulesItem__content__agenda">
          <p className="schedulesItem__content__agenda__item">
            <AiOutlineSchedule /> {formatDate(date)}
          </p>
          <p className="schedulesItem__content__agenda__item">
            <MdOutlineSchedule />
            {startTime} - {endTime}
          </p>
        </div>
        <div className="schedulesItem__content__actions">
          <button className="schedulesItem__content__actions__reschedule">
            Reagendar
          </button>
          <Link href="/" className="schedulesItem__content__actions__enter">
            <BsFillCameraVideoFill />
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SchedulesItem;
