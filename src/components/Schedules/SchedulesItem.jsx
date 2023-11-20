import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/resources/helpers/date/formatDate";
import { isDateInRange } from "@/resources/helpers/date/isDateInRange";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import "@/styles/Schedules/SchedulesItem.scss";

const SchedulesItem = ({ schedule }) => {
  const [canEnterChat, setCanEnterChat] = React.useState(false);

  React.useEffect(() => {
    if (schedule) {
      setCanEnterChat(
        isDateInRange(
          schedule.scheduleDate,
          schedule.scheduleStartTime,
          schedule.scheduleEndTime
        )
      );
    }
  }, [schedule]);

  return (
    <div className="schedulesItem">
      <div className="schedulesItem__header">
        <Image
          className="schedulesItem__header__photo"
          src={schedule.professionalPhoto}
          alt="Foto do profissional"
          width={45}
          height={45}
        />
        <div className="schedulesItem__header__details">
          <h2 className="schedulesItem__header__details__name">
            {schedule.professionalName}
          </h2>
          <p className="schedulesItem__header__details__type">
            {schedule.professionalRole}
          </p>
        </div>
      </div>
      <div className="schedulesItem__content">
        <div className="schedulesItem__content__agenda">
          <p className="schedulesItem__content__agenda__item">
            <AiOutlineSchedule /> {formatDate(schedule.scheduleDate)}
          </p>
          <p className="schedulesItem__content__agenda__item">
            <MdOutlineSchedule />
            {schedule.scheduleStartTime} - {schedule.scheduleEndTime}
          </p>
        </div>
        <div className="schedulesItem__content__actions">
          <button className="schedulesItem__content__actions__cancel">
            Cancelar
          </button>
          {canEnterChat && (
            <Link
              href={`/queue/${schedule.professionalId}?isScheduled=1`}
              className="schedulesItem__content__actions__enter"
            >
              <IoIosChatbubbles />
              Entrar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulesItem;
