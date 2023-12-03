"use client";

import React from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { getNext10DaysFromDate } from "@/resources/helpers/date/getNext10DaysFromDate";
import { currentDate } from "@/resources/helpers/date/currentDate";
import { times } from "@/resources/utils/times/times";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AttendantServices } from "@/services/modules/attendant";
import { isParameterTimeGreaterThanCurrent } from "@/resources/helpers/time/isParameterTimeGreaterThanCurrent";
import "./page.scss";

const Page = ({ params }) => {
  const { userData, userDataDecode, connectID, setLoading } =
    React.useContext(UserContext);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [attendantLocations, setAttendantLocations] = React.useState(null);
  const [selectedAttendantLocationId, setSelectedAttendantLocationId] =
    React.useState("");
  const [weekDays, setWeekDays] = React.useState(null);
  const [checked, setChecked] = React.useState([]);
  const [disabledTimes, setDisabledTimes] = React.useState([]);
  const isOnlineAgenda = params.type === "online";
  const isInPersonAgenda = params.type === "inPerson";
  const navigationLinks = {
    agendaOnline: "/attendant-agenda/online",
    agendaInPerson: "/attendant-agenda/inPerson",
  };

  const getAttendantLocations = async () => {
    const { userId } = userDataDecode;
    try {
      const attendantLocations =
        await AttendantServices.getAttendantLocationsById(userId, connectID);
      setAttendantLocations(attendantLocations);
    } catch (error) {}
  };

  const getAttendantAgenda = async () => {
    const isOnline = params.type === "online" ? 1 : 0;
    const locationId = isOnline ? null : selectedAttendantLocationId;
    const { userId } = userDataDecode;

    const attendantAgendaBody = {
      attendantId: userId,
      date: selectedDate,
      isOnline,
      locationId,
    };

    try {
      const attendantAgenda = await AttendantServices.getAttendantAgenda(
        attendantAgendaBody,
        connectID
      );
      const [agenda, disabledTimes] = attendantAgenda;

      setChecked(agenda);
      setDisabledTimes(disabledTimes);
    } catch (error) {
      setChecked([]);
    }
  };

  const handleCheck = (event) => {
    let updatedList = [...checked];

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    updatedList.sort((a, b) => {
      const minutesA =
        parseInt(a.split(":")[0]) * 60 + parseInt(a.split(":")[1]);
      const minutesB =
        parseInt(b.split(":")[0]) * 60 + parseInt(b.split(":")[1]);
      return minutesB - minutesA;
    });

    setChecked(updatedList);
  };

  async function handleSaveAttendantAgenda() {
    const { userId } = userDataDecode;
    const attendantAgendaBody = {
      attendantId: userId,
      date: selectedDate,
      hours: checked,
    };

    setLoading(true);

    try {
      let updateAttendantAgenda;
      if (isOnlineAgenda) {
        updateAttendantAgenda =
          await AttendantServices.updateAttedantOnlineAgenda(
            attendantAgendaBody,
            connectID
          );
      } else {
        updateAttendantAgenda =
          await AttendantServices.updateAttedantInPersonAgenda(
            { ...attendantAgendaBody, locationId: selectedAttendantLocationId },
            connectID
          );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (isOnlineAgenda) {
      setSelectedDate(currentDate());
      setWeekDays(getNext10DaysFromDate(currentDate()));
    }
  }, [isOnlineAgenda]);

  React.useEffect(() => {
    if (isInPersonAgenda) {
      getAttendantLocations();
    }
  }, [isInPersonAgenda]);

  React.useEffect(() => {
    if (selectedAttendantLocationId.length > 0) {
      setSelectedDate(currentDate());
      setWeekDays(getNext10DaysFromDate(currentDate()));
      getAttendantAgenda();
    }
  }, [selectedAttendantLocationId]);

  React.useEffect(() => {
    if (selectedDate) getAttendantAgenda();
  }, [selectedDate]);

  if (userData)
    return (
      <section className="attendantAgenda">
        <header className="attendantAgenda__header">
          <div className="attendantAgenda__header__navigation">
            <Link
              className="attendantAgenda__header__navigation__link"
              href={
                isInPersonAgenda
                  ? navigationLinks.agendaOnline
                  : navigationLinks.agendaInPerson
              }
            >
              <FaExternalLinkAlt />
              {isInPersonAgenda
                ? "Acessar agenda online"
                : "Acessar agenda presencial"}
            </Link>
          </div>

          <h2 className="attendantAgenda__header__title">
            {isInPersonAgenda
              ? "Gerenciar agenda presencial"
              : "Gerenciar agenda online"}
          </h2>
          <p className="attendantAgenda__header__subtitle">
            Preencha sua agenda ou edite quando quiser
          </p>
        </header>

        {/* Listagem e seleção do local de trabalho */}
        {isInPersonAgenda && (
          <div className="attendantAgenda__selectLocation">
            {!attendantLocations ? (
              <>
                <p>Você não possui unidades de atendimento</p>
                <Link href="/attendant-locations">
                  <small>Para adicionar um novo local clique aqui</small>
                </Link>
              </>
            ) : (
              <>
                <p>Selecione a unidade de atendimento</p>
                <select
                  className="attendantAgenda__selectLocation__select"
                  value={selectedAttendantLocationId}
                  onChange={({ target }) =>
                    setSelectedAttendantLocationId(target.value)
                  }
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {attendantLocations &&
                    attendantLocations.map((location) => (
                      <option
                        key={location.locationId}
                        value={location.locationId}
                      >
                        {location.locationName}
                      </option>
                    ))}
                </select>
                <Link
                  href="/attendant-locations"
                  className="attendantAgenda__selectLocation__link"
                >
                  <small>Adicionar novo local</small>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Lista de dias */}
        <ul className="attendantAgenda__daysList">
          {weekDays &&
            weekDays.map((day) => {
              const { dayOfWeek, date } = day;
              const isSelected = selectedDate === date && "--selected";
              const dayOfMonth = date.split("/")[0];
              const month = date.split("/")[1];
              const currentDay = `${dayOfMonth}/${month}`;

              return (
                <li
                  key={date}
                  className={`attendantAgenda__day ${isSelected}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <p className="attendantAgenda__day__text">{dayOfWeek}</p>
                  <p className="attendantAgenda__day__number">{currentDay}</p>
                </li>
              );
            })}
        </ul>

        {/* Lista de horários */}
        <div className="attendantAgenda__timesOptions">
          {selectedDate &&
            times &&
            times.map((hour) => {
              const { id, time } = hour;
              const isDisabled = disabledTimes.includes(time);
              const isOldTime =
                !isParameterTimeGreaterThanCurrent(time) &&
                selectedDate === currentDate();

              if (isOldTime || isDisabled) return null;
              return (
                <div key={id} className="attendantAgenda__timeField">
                  <input
                    value={time}
                    type="checkbox"
                    id={id}
                    checked={checked.includes(time)}
                    className="attendantAgenda__timeField__input"
                    onChange={handleCheck}
                  />
                  <label
                    htmlFor={id}
                    className="attendantAgenda__timeField__label"
                  >
                    {time}
                  </label>
                </div>
              );
            })}
        </div>

        {/* Envio de horários da agenda */}
        {selectedDate && (
          <button
            onClick={handleSaveAttendantAgenda}
            className="attendantAgenda__submit"
          >
            Salvar horários
          </button>
        )}
      </section>
    );
};

export default Page;
