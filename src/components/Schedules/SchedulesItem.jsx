import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/resources/helpers/date/formatDate";
import { isDateInRange } from "@/resources/helpers/date/isDateInRange";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { UserContext } from "@/context/UserContext";
import { PatientServices } from "@/services/modules/patient";
import { FaRegBuilding } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import "@/styles/Schedules/SchedulesItem.scss";

const SchedulesItem = ({ schedule, getSchedules }) => {
  const { userDataDecode, setLoading, connectID } =
    React.useContext(UserContext);
  const [canEnterChat, setCanEnterChat] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const isInPerson = schedule.locationInfo?.length > 0;

  async function handleCancelSchedule() {
    setDisableButton(true);
    setLoading(true);

    try {
      const patientId = userDataDecode.userId;
      const { scheduleId } = schedule;
      const cancelSchedule = await PatientServices.cancelPatientSchedule(
        scheduleId,
        patientId,
        connectID
      );
      getSchedules(patientId);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

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
        <div
          className={`schedulesItem__status ${
            isInPerson ? "--inPerson" : "--online"
          }`}
        >
          {isInPerson ? "Presencial" : "Online"}
        </div>
        <div
          className="schedulesItem__header__photo"
          style={{ backgroundImage: `url(${schedule.professionalPhoto})` }}
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

        {isInPerson && (
          <div className="schedulesItem__content__place">
            <p className="schedulesItem__content__place__item">
              <FaRegBuilding />
              {schedule.locationInfo[0].locationAddress} -{" "}
              {schedule.locationInfo[0].locationNumber}
            </p>
            <p className="schedulesItem__content__place__item">
              <SlLocationPin />
              {schedule.locationInfo[0].locationCity} -{" "}
              {schedule.locationInfo[0].locationState}
            </p>
          </div>
        )}

        <div className="schedulesItem__content__actions">
          <button
            className="schedulesItem__content__actions__cancel"
            disabled={disableButton}
            onClick={handleCancelSchedule}
          >
            Cancelar
          </button>
          {!isInPerson && (
            <Link
              href={schedule.scheduleMeetUrl || ""}
              target="_blank"
              className={`schedulesItem__content__actions__enter ${
                !canEnterChat || !schedule.scheduleMeetUrl ? "--disabled" : ""
              }`}
            >
              <IoMdVideocam />
              Entrar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulesItem;
