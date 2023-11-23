"use client";

import React from "react";
import SchedulesItem from "@/components/Schedules/SchedulesItem";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { SchedulesServices } from "@/services/modules/schedules";
import "@/styles/Schedules/Schedules.scss";

const Schedules = () => {
  const { userData, connectID, setLoading } = React.useContext(UserContext);
  const [userSchedules, setUserSchedules] = React.useState(null);

  async function getUserSchedules(patientId) {
    setLoading(true);
    try {
      const getSchedules = await SchedulesServices.getPatientSchedulesById(
        { patientId },
        connectID
      );
      setUserSchedules(getSchedules);
    } catch (error) {
      setUserSchedules(null);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (userData) getUserSchedules(userData.id);
  }, [userData]);

  if (userData)
    return (
      <div className="schedules">
        <div className="schedules__header">
          <h1 className="schedules__header__title">
            Olá, {userData?.name.split(" ")[0]}
          </h1>
          <p className="schedules__header__subtitle">
            Seus agendamentos futuros
          </p>
        </div>
        <div className="schedules__actions">
          <Link href="/scheduling/inPerson">+ Agendamento presencial</Link>
          <Link href="/scheduling/online">+ Agendamento online</Link>
        </div>
        {!userSchedules && (
          <p className="schedules__noSchedules">
            Sem agendamentos cadastrados no momento, clique em um dois botões
            acima e crie seu próximo agendamento!
          </p>
        )}
        <ul className="schedules__list">
          {userSchedules &&
            userSchedules.map((userSchedule) => (
              <li
                key={userSchedule.scheduleId}
                className="schedules__list__item"
              >
                <SchedulesItem
                  schedule={userSchedule}
                  getSchedules={getUserSchedules}
                />
              </li>
            ))}
        </ul>
      </div>
    );
};

export default Schedules;
