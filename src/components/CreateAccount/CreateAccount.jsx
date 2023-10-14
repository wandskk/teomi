'use client';
import React from 'react';
import CreateAccountStepOne from './CreateAccountStepOne';
import CreateAccountStepTwo from './CreateAccountStepTwo';
import CreateAccountStepThree from './CreateAccountStepThree';
import { SystemServices } from '@/services/modules/system';
import { UserContext } from '@/context/UserContext';
import { UsersServices } from '@/services/modules/users';
import { statesList } from '@/resources/utils/states/statesList';
import { randomEmail } from '@/resources/helpers/email/randomEmail';
import { BsDot } from 'react-icons/bs';
import '@/styles/CreateAccount/CreateAccount.scss';

const CreateAccount = () => {
  const {
    connectID: authToken,
    setLoading,
    userLogin,
  } = React.useContext(UserContext);
  const [step, setStep] = React.useState(1);

  const [stepOne, setStepOne] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthdate: '',
    gender: '',
  });

  const [stepTwo, setStepTwo] = React.useState({
    postalCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
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
      <div key={i} className='createAccount__stepsIndicator__dots__dot'>
        {arr}
      </div>
    ));
  };

  const handleSubmit = async (values) => {
    const { stepOne, stepTwo, stepThree } = values;

    const createUserBody = {
      ...stepOne,
      birthdate: stepOne.birthdate.split('/').join(''),
      gender: +stepOne.gender,
    };

    const getCityByName = await SystemServices.getCityIdByName(
      stepTwo.city,
      authToken
    );

    const stateId = statesList.find((state) => state.tag === stepTwo.state).id;
    const cityId = getCityByName.data.results.find(
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

      userLogin(email, password);
    } catch (error) {}
  };

  return (
    <div className='createAccount'>
      <h1 className='createAccount__title'>Inscreva-se</h1>
      <div className='createAccount__stepsIndicator'>
        <p className='createAccount__stepsIndicator__text'>Passo {step}</p>
        <div className='createAccount__stepsIndicator__dots'>
          {renderDots()}
        </div>
      </div>
      <div className='createAccount__content'>
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
      <div className='createAccount__footer'>
        <button
          className={`createAccount__footer__button ${
            step === 3 && 'createAccount__footer__button--submit'
          }`}
          disabled={
            (step === 1 && !stepOne) ||
            (step === 2 && !stepTwo) ||
            (step === 3 && !stepThree)
          }
          onClick={() => (step === 3 ? handleStep.submit() : handleStep.next())}
        >
          {(step === 1 || step === 2) && 'Avançar'}
          {step === 3 && 'Finalizar'}
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
