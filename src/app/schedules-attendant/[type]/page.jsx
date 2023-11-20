"use client";

import React from "react";
import Search from "@/components/Search/Search";
import PatientCard from "@/components/PatientCard/PatientCard";
import { UserContext } from "@/context/UserContext";
import { AttendantServices } from "@/services/modules/attendant";
import "./page.scss";

const Page = ({ params }) => {
  const { connectID, setLoading, userDataDecode } =
    React.useContext(UserContext);
  const [patientsList, setPatientsList] = React.useState(null);
  const [search, setSearch] = React.useState("");

  async function getPendingSchedules() {
    setLoading(true);

    try {
      const patientList = await AttendantServices.getPendingSchedules(
        userDataDecode.userId,
        connectID
      );
      setPatientsList(patientList);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function getConfirmedSchedules(attendantId) {
    setLoading(true);
    try {
      const confirmedSchedules = await AttendantServices.getConfirmedSchedules(
        attendantId,
        connectID
      );
      setPatientsList(confirmedSchedules);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function handleAcceptSchedule(scheduleId) {
    const bodyAcceptSchedule = {
      attendantId: userDataDecode.userId,
      scheduleId,
    };
    try {
      const acceptSchedule = await AttendantServices.acceptPendingSchedule(
        bodyAcceptSchedule,
        connectID
      );
      getPendingSchedules();
    } catch (error) {}
    try {
    } catch (error) {}
  }

  React.useEffect(() => {
    if (params.type === "waiting") getPendingSchedules();
    else getConfirmedSchedules(userDataDecode.userId);
  }, [connectID]);

  return (
    <div className="patients">
      <Search setSearch={setSearch} noFilter={true} />

      <div className="patients__actions">
        {params.type === "waiting" && (
          <a href="/schedules-attendant/scheduled">Agendamentos confirmados</a>
        )}
        {params.type === "scheduled" && (
          <a href="/schedules-attendant/waiting">Aguardando agendamento</a>
        )}
      </div>

      <h1 className="patients__title">
        {params.type === "waiting" ? "Aguardando agendamento " : "Agendados "}
      </h1>

      <ul className="patients__list">
        {patientsList &&
          patientsList
            .filter((patient) => {
              if (search.length > 2) {
                const searchToLower = search.toLowerCase();
                const patientNameToLower = patient.patientName.toLowerCase();
                return patientNameToLower.includes(searchToLower);
              }
              return patient;
            })
            .map((patient) => (
              <li key={patient.patientId}>
                <PatientCard
                  patientData={patient}
                  type={params.type}
                  onClick={handleAcceptSchedule}
                />
              </li>
            ))}
      </ul>
      {patientsList && patientsList.length === 0 && (
        <p className="patients__noPatients">
          {params.type === "waiting"
            ? "Não há pacientes aguardando confirmação até o momento"
            : "Não há pacientes confirmados até o momento"}
        </p>
      )}
    </div>
  );
};

export default Page;
