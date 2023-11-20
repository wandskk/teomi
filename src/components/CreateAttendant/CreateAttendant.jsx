"use client";
import React from "react";
import CreateAttendantStepOne from "./CreateAttendantStepOne";
import CreateAttendantStepTwo from "./CreateAttendantStepTwo";
import CreateAttendantStepThree from "./CreateAttendantStepThree";
import CreateAttendantStepFour from "./CreateAttendantStepFour";
import SuccessScreen from "@/components/SuccessScreen/SuccessScreen";
import { randomEmail } from "@/resources/helpers/email/randomEmail";
import { SystemServices } from "@/services/modules/system";
import { UserContext } from "@/context/UserContext";
import { UsersServices } from "@/services/modules/users";
import { statesList } from "@/resources/utils/states/statesList";
import { BsDot } from "react-icons/bs";
import { AttendantServices } from "@/services/modules/attendant";
import "@/styles/CreateAttendant/CreateAttendant.scss";

const CreateAttendant = () => {
  const [finishCreateAttendant, setFinishCreateAttendant] =
    React.useState(false);
  const {
    connectID: authToken,
    setLoading,
  } = React.useContext(UserContext);
  const [step, setStep] = React.useState(1);

  const [stepOne, setStepOne] = React.useState({
    name: "Wanderson Kenedy Soares de Oliveira",
    email: randomEmail(),
    password: "wandsk13",
    confirmPassword: "wandsk13",
    phone: "84994873510",
    birthdate: "11/01/1997",
    gender: 1,
  });

  const [stepTwo, setStepTwo] = React.useState({
    cpf: "12167857403",
    rg: "245040894",
    role: "Doutor cuzinho",
    registerNumber: "123456789",
    occupationArea: "Nenhuma",
  });

  const [stepThree, setStepThree] = React.useState({
    postalCode: "59695000",
    address: "Rua de São Paulo",
    number: "108",
    complement: "Prox a casa do carai",
    neighborhood: "Centro",
    city: "Baraúna",
    state: "RN",
  });
  const [stepFour, setStepFour] = React.useState(null);

  const handleStep = {
    next: () => setStep(step + 1),
    submit: () => handleSubmit({ stepOne, stepTwo, stepThree, stepFour }),
  };

  const renderDots = () => {
    const array = [];
    for (let i = 0; i < 17; i++) array.push(<BsDot />);

    return array.map((arr, i) => (
      <div key={i} className="createAttendant__stepsIndicator__dots__dot">
        {arr}
      </div>
    ));
  };

  const handleSubmit = async (values) => {
    const { stepOne, stepTwo, stepThree } = values;

    const createAttendantBody = {
      ...stepOne,
      birthdate: stepOne.birthdate.split("/").join(""),
      gender: +stepOne.gender,
      ...stepTwo,
    };

    const getCityByName = await SystemServices.getCityIdByName(
      stepThree.city,
      authToken
    );

    const stateId = statesList.find(
      (state) => state.tag === stepThree.state
    ).id;
    const cityId = getCityByName.data.getCities.find(
      (city) => city.state_id === stateId
    ).id;

    const updateUserLocationBody = {
      ...stepThree,
      cityId: cityId,
      stateId: stateId,
    };

    const updateUserPhotoBody = {
      pictureBlob: stepFour,
    };
    setLoading(true);
    try {
      const createAttendant = await AttendantServices.createAttendant(
        createAttendantBody,
        authToken
      );

      const { email, password } = createAttendantBody;

      const { userUniqueId } = createAttendant.data;

      const updateUserLocation = await UsersServices.updateUserLocation(
        { ...updateUserLocationBody, userUniqueId },
        authToken
      );

      if (stepThree) {
        const updateUserPhoto = await UsersServices.updateUserPhoto(
          { ...updateUserPhotoBody, userUniqueId },
          authToken
        );
      }
      setFinishCreateAttendant(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createAttendant">
      {finishCreateAttendant && (
        <SuccessScreen
          text="Cadastro Realizado com sucesso!"
          subtext="Agora, aguarde a aprovação do seu registro.
          Em breve, você estará pronto(a) para começar.😊"
          link="/"
          linkText="Entendido!"
        />
      )}
      <h1 className="createAttendant__title">Inscreva-se</h1>
      <div className="createAttendant__stepsIndicator">
        <p className="createAttendant__stepsIndicator__text --create-account">
          Passo {step}
        </p>
        <div className="createAttendant__stepsIndicator__dots">
          {renderDots()}
        </div>
      </div>
      <div className="createAttendant__content">
        {step === 1 && (
          <CreateAttendantStepOne
            stepValues={stepOne}
            setStepValues={setStepOne}
          />
        )}
        {step === 2 && (
          <CreateAttendantStepTwo
            stepValues={stepTwo}
            setStepValues={setStepTwo}
          />
        )}
        {step === 3 && (
          <CreateAttendantStepThree
            stepValues={stepThree}
            setStepValues={setStepThree}
          />
        )}
        {step === 4 && (
          <CreateAttendantStepFour
            gender={stepOne.gender}
            stepValues={stepFour}
            setStepValues={setStepFour}
          />
        )}
      </div>
      <div className="createAttendant__footer">
        <button
          className={`createAttendant__footer__button ${
            step === 3 && "createAttendant__footer__button--submit"
          }`}
          disabled={
            (step === 1 && !stepOne) ||
            (step === 2 && !stepTwo) ||
            (step === 3 && !stepThree) ||
            (step === 4 && !stepFour)
          }
          onClick={() => (step === 4 ? handleStep.submit() : handleStep.next())}
        >
          {step === 4 ? "Salvar" : "Avançar"}
        </button>
      </div>
    </div>
  );
};

export default CreateAttendant;
