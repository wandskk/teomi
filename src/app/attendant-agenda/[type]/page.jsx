"use client";

import React from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { getNext10DaysFromDate } from "@/resources/helpers/date/getNext10DaysFromDate";
import { currentDate } from "@/resources/helpers/date/currentDate";
import { times } from "@/resources/utils/times/times";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./page.scss";

const navigationLinks = {
  agendaOnline: "/attendant-agenda/online",
  agendaInPerson: "/attendant-agenda/inPerson",
};

const Page = ({ params }) => {
  const { userData } = React.useContext(UserContext);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [attendantPlaces, setAttendantPlaces] = React.useState(null);
  const [weekDays, setWeekDays] = React.useState(null);
  const [checked, setChecked] = React.useState([]);
  const isOnlineAgenda = params.type === "online";
  const isInPersonAgenda = params.type === "inPerson";

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

  async function handleSaveAttendantAgenda() {}

  React.useEffect(() => {
    if (isOnlineAgenda) {
      setSelectedDate(currentDate());
      setWeekDays(getNext10DaysFromDate(currentDate()));
    }
  }, [isOnlineAgenda]);

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
              return (
                <div key={id} className="attendantAgenda__timeField">
                  <input
                    value={time}
                    type="checkbox"
                    id={id}
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
