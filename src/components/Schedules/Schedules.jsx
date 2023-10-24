"use client";

import React from "react";
import SchedulesItem from "@/components/Schedules/SchedulesItem";
import { UserContext } from "@/context/UserContext";
import "@/styles/Schedules/Schedules.scss";

const userSchedules = [
  {
    id: 1,
    professionalName: "Dr. Silva",
    professionalType: "Médico",
    date: "24/10/2023",
    startTime: "09:30",
    endTime: "10:30",
    link: "https://example.com/meeting/12345",
    professionalPhoto: "https://example.com/photos/dr_silva.jpg",
  },
  {
    id: 2,
    professionalName: "Joana Ferreira",
    professionalType: "Dentista",
    date: "25/10/2023",
    startTime: "14:00",
    endTime: "15:00",
    link: "https://example.com/meeting/67890",
    professionalPhoto: "https://example.com/photos/joana_ferreira.jpg",
  },
  {
    id: 3,
    professionalName: "Ana Sousa",
    professionalType: "Terapeuta",
    date: "26/10/2023",
    startTime: "16:00",
    endTime: "17:30",
    link: "https://example.com/meeting/54321",
    professionalPhoto: "https://example.com/photos/ana_sousa.jpg",
  },
];

const Schedules = () => {
  const { userData } = React.useContext(UserContext);
  return (
    <div className="schedules">
      <div className="schedules__header">
        <h1 className="schedules__header__title">Olá, {userData?.name}</h1>
        <p className="schedules__header__subtitle">Seus agendamentos futuros</p>
      </div>
      <ul className="schedules__list">
        {userSchedules &&
          userSchedules.map((userSchedule) => (
            <li key={userSchedule.id} className="schedules__list__item">
              <SchedulesItem schedule={userSchedule} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Schedules;
