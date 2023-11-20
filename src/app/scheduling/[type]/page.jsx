"use client";

import React from "react";
import Image from "next/image";
import ReactInputMask from "react-input-mask";
import SuccessScreen from "@/components/SuccessScreen/SuccessScreen";
import Link from "next/link";
import { SchedulesServices } from "@/services/modules/schedules/";
import { isDateBeforeCurrent } from "@/resources/helpers/date/isDateBeforeCurrent";
import { getWeekdaysAroundDate } from "@/resources/helpers/date/getWeekdaysAroundDate";
import { currentDate } from "@/resources/helpers/date/currentDate";
import { times } from "@/resources/utils/times/times";
import { UserContext } from "@/context/UserContext";
import { isParameterTimeGreaterThanCurrent } from "@/resources/helpers/time/isParameterTimeGreaterThanCurrent";
import { MdPlace } from "react-icons/md";
import "./page.scss";

const pageType = {
  inPerson: 1,
  online: 2,
};

const page = ({ params }) => {
  const { userDataDecode, connectID, setLoading } =
    React.useContext(UserContext);
  const [selectCep, setSelectCep] = React.useState(
    userDataDecode?.userPostalCode ?? ""
  );
  const [placesList, setPlacesList] = React.useState(null);
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(currentDate());
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [attendantList, setAttendantList] = React.useState(null);
  const [finishScheduling, setFinishScheduling] = React.useState(false);
  const [selectedAttendant, setSelectedAttendant] = React.useState(null);
  const [indisponiblesTimes, setIndiponiblesTimes] = React.useState(null);
  const [currentAttedantIndex, setCurrentAttendantIndex] = React.useState(0);
  const [step, setStep] = React.useState(pageType[params.type]);
  const weekdays = getWeekdaysAroundDate(currentDate());

  const getAttendantList = React.useCallback(async (date, time, connectID) => {
    setLoading(true);
    try {
      const attendants = await SchedulesServices.getAttendantByTimeAndDate(
        date,
        time,
        connectID
      );
      setAttendantList(attendants);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleStep = () => {
    if (step === 3) setSelectedAttendant(attendantList[currentAttedantIndex]);
    else setStep(step + 1);
  };

  const handleChangeCarousel = (type) => {
    if (type === "next") {
      setCurrentAttendantIndex(currentAttedantIndex + 1);
    } else if (type === "prev") {
      setCurrentAttendantIndex(currentAttedantIndex - 1);
    }
  };

  const getIndiponiblesTimesInDate = async (date) => {
    setLoading(true);
    const arrayIndiponiblesTimes = [];
    const userBody = {
      date,
      patientId: userDataDecode.userId,
    };

    try {
      const indisponiblesTimes = await SchedulesServices.getSchedulesByDate(
        date,
        connectID
      );
      arrayIndiponiblesTimes.push(...indisponiblesTimes);

      const indisponiblesTimesUser =
        await SchedulesServices.getPatientSchedulesByData(userBody, connectID);

      indisponiblesTimesUser.map((time) => {
        if (indisponiblesTimes.indexOf(time) === -1)
          arrayIndiponiblesTimes.push(time);
      });

      setIndiponiblesTimes(arrayIndiponiblesTimes);
    } catch (error) {
      setIndiponiblesTimes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const schedulingBody = {
      patientId: userDataDecode.userId,
      professionalId: selectedAttendant.userId,
      isOnline: params.type === "online" ? 1 : 0,
      date: selectedDate,
      startTime: selectedTime,
      locationId: selectedPlace,
    };

    setLoading(true);
    try {
      const createSchedule = await SchedulesServices.createSchedule(
        schedulingBody,
        connectID
      );
      setFinishScheduling(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlePostalCodeList = async (postalCode) => {
    setLoading(true);
    try {
      const places = await SchedulesServices.getSchedulesLocationsByPostalCode(
        postalCode,
        connectID
      );
      setPlacesList(places);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (step === 3) getAttendantList(selectedDate, selectedTime, connectID);
  }, [getAttendantList, step]);

  React.useEffect(() => {
    selectedDate && getIndiponiblesTimesInDate(selectedDate);
    setSelectedTime(null);
  }, [selectedDate]);

  React.useEffect(() => {
    if (selectedAttendant) handleSubmit();
  }, [selectedAttendant]);

  React.useEffect(() => {
    setPlacesList(null);
    const cepUnmasked = selectCep.replace(/\D/g, "");
    if (cepUnmasked.length === 8) handlePostalCodeList(cepUnmasked);
  }, [selectCep]);

  return (
    <section className="scheduling">
      <header className="scheduling__header">
        <div className="scheduling__header__change">
          {params.type === "online" && step === 2 && (
            <Link href="/scheduling/inPerson">Mudar para agendamento presencial</Link>
          )}
          {params.type === "inPerson" && step === 1 && (
            <Link href="/scheduling/online">Mudar para agendamento online</Link>
          )}
        </div>
        <h1>
          Agendamento {params.type === "inPerson" ? "presencial" : "online"}
        </h1>
        <p>
          {step === 1 && "Digite seu cep"}
          {step === 2 && "Escolha o dia e horário para o atendimento"}
          {step === 3 && "Escolha o profissional"}
        </p>

        {step === 1 && (
          <ReactInputMask
            className="scheduling__header__inputCep"
            mask="99999-999"
            placeholder="Ex: 59695-000"
            type="text"
            value={selectCep}
            onChange={({ target }) => setSelectCep(target.value)}
          />
        )}
      </header>
      <div className="scheduling__content">
        {step === 1 && (
          <div className="scheduling__inPerson">
            {!placesList && <p>Digite o cep para continuar</p>}

            <ul className="scheduling__inPerson__list">
              {placesList &&
                placesList.map((place) => (
                  <li className="scheduling__inPerson__place" key={place.id}>
                    <div className="scheduling__inPerson__icon">
                      <MdPlace />
                    </div>
                    <div className="scheduling__inPerson__select">
                      <h2>{place.name}</h2>
                      <p>
                        {place.address}, {place.number}
                      </p>

                      <button
                        onClick={() => {
                          setSelectedPlace(place.id);
                          handleStep("next");
                        }}
                      >
                        Selecionar
                      </button>
                    </div>
                    <div
                      className="scheduling__inPerson__image"
                      style={{ backgroundImage: `url('${place.image}')` }}
                    ></div>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {/* Step 2 */}
        {step === 2 && (
          <>
            <ul className="scheduling__days">
              {weekdays &&
                weekdays.map((day) => {
                  const { name, date } = day;
                  const isSelected = selectedDate === date && "--selected";
                  const isOldDate = isDateBeforeCurrent(date);
                  const isDisabled = isOldDate && "--disabled";
                  const currentDay = date.split("/")[0];

                  return (
                    <li
                      onClick={() => handleSelectDate(date)}
                      key={name}
                      className={`scheduling__day ${isSelected} ${isDisabled}`}
                    >
                      <p className="scheduling__day__text">{name}</p>
                      <p className="scheduling__day__number">{currentDay}</p>
                    </li>
                  );
                })}
            </ul>
            <hr />
            <ul className="scheduling__times">
              {indisponiblesTimes &&
                times &&
                times.map((hour) => {
                  const { id, time } = hour;
                  const isOldTime = !isParameterTimeGreaterThanCurrent(time);
                  const disabledTime =
                    indisponiblesTimes.indexOf(time) !== -1 || isOldTime;
                  const isSelected = selectedTime === time && "--selected";
                  const isDisabled = disabledTime && "--disabled";
                  return (
                    <li
                      key={id}
                      className={`scheduling__time ${isSelected} ${isDisabled}`}
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </li>
                  );
                })}
            </ul>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && attendantList && (
          <div className="scheduling__selectAttendant">
            <ul className="scheduling__selectAttendant__list">
              {attendantList &&
                attendantList.map((attendant, index) => {
                  if (currentAttedantIndex === index)
                    return (
                      <li
                        key={attendant.userId}
                        className="scheduling__selectAttendant__attendant"
                      >
                        <Image
                          src={attendant.userPhoto}
                          width={150}
                          height={150}
                          alt=""
                          className="scheduling__selectAttendant__attendant__photo"
                        />
                        <div className="scheduling__selectAttendant__attendant__info">
                          <p>{attendant.userName}</p>
                          <small>{attendant.userRole}</small>
                        </div>
                        {/* <div className="scheduling__selectAttendant__attendant__about">
                        <p>Sobre</p>
                        <small>{attendant.about}</small>
                      </div> */}
                      </li>
                    );
                })}
            </ul>
            <div className="scheduling__selectAttendant__actions">
              <button
                onClick={() => handleChangeCarousel("prev")}
                disabled={currentAttedantIndex === 0}
              >
                Voltar
              </button>
              <button
                onClick={() => handleChangeCarousel("next")}
                disabled={currentAttedantIndex === attendantList.length - 1}
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="scheduling__footer">
        {step !== 1 && (
          <button disabled={!selectedTime} onClick={handleStep}>
            Selecionar
          </button>
        )}
      </div>
      {finishScheduling && (
        <SuccessScreen
          text="Agendamento realizado com sucesso!"
          link="/"
          linkText="Voltar para o início"
        />
      )}
    </section>
  );
};

export default page;
