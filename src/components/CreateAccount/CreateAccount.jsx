"use client";
import React from "react";
import CreateAccountStepOne from "./CreateAccountStepOne";
import CreateAccountStepTwo from "./CreateAccountStepTwo";
import CreateAccountStepThree from "./CreateAccountStepThree";
import { SystemServices } from "@/services/modules/system";
import { randomEmail } from "@/resources/helpers/email/randomEmail";
import { UserContext } from "@/context/UserContext";
import { UsersServices } from "@/services/modules/users";
import { statesList } from "@/resources/utils/states/statesList";
import { BsDot } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import "@/styles/CreateAccount/CreateAccount.scss";
import { object } from "@/resources/helpers/object/object";

const CreateAccount = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("backToLink");

  const {
    connectID: authToken,
    setLoading,
    userLogin,
  } = React.useContext(UserContext);
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
    postalCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [stepThree, setStepThree] = React.useState(null);

  const handleStep = {
    next: () => setStep(step + 1),
    submit: () => handleSubmit({ stepOne, stepTwo, stepThree }),
  };

  const renderDots = () => {
    const array = [];
    for (let i = 0; i < 17; i++) array.push(<BsDot />);

    return array.map((arr, i) => (
      <div key={i} className="createAccount__stepsIndicator__dots__dot">
        {arr}
      </div>
    ));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const { stepOne, stepTwo, stepThree } = values;

    const createUserBody = {
      ...stepOne,
      birthdate: stepOne.birthdate.split("/").join(""),
      gender: +stepOne.gender,
    };

    const getCityByName = await SystemServices.getCityIdByName(
      stepTwo.city,
      authToken
    );

    const stateId = statesList.find((state) => state.tag === stepTwo.state).id;
    const cityId = getCityByName.data.getCities.find(
      (city) => city.state_id === stateId
    ).id;

    const updateUserLocationBody = {
      ...stepTwo,
      cityId: cityId,
      stateId: stateId,
    };

    const updateUserPhotoBody = {
      pictureBlob: stepThree,
    };

    try {
      const redirect = search ? backToLink[search] : null;
      const createUser = await UsersServices.createUser(
        createUserBody,
        authToken
      );

      const { email, password } = createUserBody;

      const { userUniqueId } = createUser.data;

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

      userLogin(email, password, redirect);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createAccount">
      <h1 className="createAccount__title">Inscreva-se</h1>
      <div className="createAccount__stepsIndicator">
        <p className="createAccount__stepsIndicator__text --create-account">
          Passo {step}
        </p>
        <div className="createAccount__stepsIndicator__dots">
          {renderDots()}
        </div>
      </div>
      <div className="createAccount__content">
        {step === 1 && (
          <CreateAccountStepOne
            stepValues={stepOne}
            setStepValues={setStepOne}
          />
        )}
        {step === 2 && (
          <CreateAccountStepTwo
            stepValues={stepTwo}
            setStepValues={setStepTwo}
          />
        )}
        {step === 3 && (
          <CreateAccountStepThree
            gender={stepOne.gender}
            stepValues={stepThree}
            setStepValues={setStepThree}
          />
        )}
      </div>
      <div className="createAccount__footer">
        <button
          className={`createAccount__footer__button ${
            step === 3 && "createAccount__footer__button--submit"
          }`}
          disabled={
            (step === 1 && object.hasEmptyAttributes(stepOne)) ||
            (step === 2 && object.hasEmptyAttributes(stepTwo))
          }
          onClick={() => (step === 3 ? handleStep.submit() : handleStep.next())}
        >
          {(step === 1 || step === 2) && "Avançar"}
          {step === 3 && "Finalizar"}
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
