"use client";
import React from "react";
import decode from "jwt-decode";
import CreateAttendantStepOne from "@/components/CreateAttendant/CreateAttendantStepOne";
import CreateAttendantStepTwo from "@/components/CreateAttendant/CreateAttendantStepTwo";
import CreateAttendantStepThree from "@/components/CreateAttendant/CreateAttendantStepThree";
import CreateAttendantStepFour from "@/components/CreateAttendant/CreateAttendantStepFour";
import Message from "@/components/Message/Message";
import { UserContext } from "@/context/UserContext";
import { UsersServices } from "@/services/modules/users";
import { object } from "@/resources/helpers/object/object";
import { messages } from "@/resources/utils/messages/messages";
import { statesList } from "@/resources/utils/states/statesList";
import { SystemServices } from "@/services/modules/system";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { AttendantServices } from "@/services/modules/attendant";
import "@/styles/CreateAccount/CreateAccount.scss";

const AttendantAccount = () => {
  const { connectID: authToken, setLoading } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);
  const [step, setStep] = React.useState(1);

  const [stepOne, setStepOne] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
    gender: "",
  });

  const [stepTwo, setStepTwo] = React.useState({
    cpf: "",
    rg: "",
    role: "",
    registerNumber: "",
    occupationArea: "",
  });

  const [stepThree, setStepThree] = React.useState({
    postalCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [stepFour, setStepFour] = React.useState(null);

  const handleStep = (step) => setStep(step);

  const updateUserData = async (values, userUniqueId) => {
    const userBody = { ...values, userUniqueId };

    setMessage(null);
    setLoading(true);
    const { success, error } = messages;

    try {
      const updateUser = await AttendantServices.updateAttendantData(
        userBody,
        authToken
      );
      setMessage({ text: success.updateUser, type: "success" });
    } catch (err) {
      setMessage({ text: error.updateUser, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updateUserLocation = async (values, userUniqueId) => {
    const locationBody = { ...values, userUniqueId };
    const isValid = !object.hasEmptyAttributes(locationBody);

    if (isValid) {
      setMessage(null);
      setLoading(true);
      const { success, error } = messages;

      try {
        const getCityByName = await SystemServices.getCityIdByName(
          values.city,
          authToken
        );

        const stateId = statesList.find(
          (state) => state.tag === values.state
        ).id;

        const cityId = getCityByName.data.getCities.find(
          (city) => city.state_id === stateId
        ).id;

        const updateUserLocation = await UsersServices.updateUserLocation(
          { ...locationBody, stateId, cityId },
          authToken
        );

        setMessage({ text: success.updateLocation, type: "success" });
      } catch (err) {
        const { message } = err.response.data;
        setMessage({ text: message ?? error.updateLocation, type: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const updateUserPhoto = async (pictureBlob, userUniqueId) => {
    const photoBody = { pictureBlob, userUniqueId };
    const { success, error } = messages;

    setMessage(null);
    setLoading(true);
    try {
      const updateUserPhoto = await UsersServices.updateUserPhoto(
        photoBody,
        authToken
      );
      setMessage({ text: success.updatePhoto, type: "success" });
    } catch (err) {
      const { message } = err.response.data;
      setMessage({ text: message ?? error.updatePhoto, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  function handleSubmit(step) {
    const { userUniqueId } = decode(getCookie("userLogin"));

    if (step === 1 || step === 2)
      updateUserData({ ...stepOne, ...stepTwo }, userUniqueId);

    if (step === 3) updateUserLocation(stepThree, userUniqueId);

    if (step === 4) updateUserPhoto(stepFour, userUniqueId);
  }

  return (
    <div className="createAccount">
      <Message
        message={message?.text}
        type={message?.type}
        resetMessage={setMessage}
      />
      <h1 className="createAccount__title --account">Dados Cadastrais</h1>
      <div className="createAccount__stepsIndicator">
        <p
          className={`createAccount__stepsIndicator__text ${
            step !== 1 ? "--disabled" : ""
          }`}
          onClick={() => handleStep(1)}
        >
          Dados
        </p>
        <p
          className={`createAccount__stepsIndicator__text ${
            step !== 2 ? "--disabled" : ""
          }`}
          onClick={() => handleStep(2)}
        >
          Profissional
        </p>
        <p
          className={`createAccount__stepsIndicator__text ${
            step !== 3 ? "--disabled" : ""
          }`}
          onClick={() => handleStep(3)}
        >
          Endereço
        </p>
        <p
          className={`createAccount__stepsIndicator__text ${
            step !== 4 ? "--disabled" : ""
          }`}
          onClick={() => handleStep(4)}
        >
          Foto
        </p>
      </div>
      <div className="createAccount__content">
        {step === 1 && (
          <CreateAttendantStepOne
            stepValues={stepOne}
            setStepValues={setStepOne}
            edit
          />
        )}
        {step === 2 && (
          <CreateAttendantStepTwo
            stepValues={stepTwo}
            setStepValues={setStepTwo}
            edit
          />
        )}
        {step === 3 && (
          <CreateAttendantStepThree
            stepValues={stepThree}
            setStepValues={setStepThree}
            edit
          />
        )}
        {step === 4 && (
          <CreateAttendantStepFour
            gender={stepOne.gender}
            stepValues={stepFour}
            setStepValues={setStepFour}
            edit
          />
        )}
      </div>
      <div className="createAccount__footer">
        <button
          className={`createAccount__footer__button ${
            step === 3 ? "createAccount__footer__button--submit" : ""
          }`}
          onClick={() => handleSubmit(step)}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default AttendantAccount;
