'use client';
<<<<<<< HEAD

=======
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
import React from 'react';
import CreateAccountStepOne from './CreateAccountStepOne';
import CreateAccountStepTwo from './CreateAccountStepTwo';
import CreateAccountStepThree from './CreateAccountStepThree';
<<<<<<< HEAD
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
  const [step, setStep] = React.useState(3);
    
  const [stepOne, setStepOne] = React.useState({
    name: 'Wanderson Kenedy Soares de Oliveira',
    email: randomEmail(),
    password: 'teste123',
    confirmPassword: 'teste123',
    phone: '84994873510',
    birthdate: '11/01/1997',
    gender: '1',
  });

  const [stepTwo, setStepTwo] = React.useState({
    postalCode: '59695000',
    address: 'Rua Anselmo Leandro',
    number: '108',
    complement: 'teste',
=======
import { BsDot } from 'react-icons/bs';
import './styles/CreateAccount.scss';

const CreateAccount = () => {
  const [step, setStep] = React.useState(3);
  const [stepOne, setStepOne] = React.useState({
    email: 'wandersonkenedy@bne.com.br',
    password: '123',
    confirmPassword: '123',
    telephone: '84994873510',
    birthday: '11/01/1997',
    gender: 'man',
  });
  const [stepTwo, setStepTwo] = React.useState({
    cep: '59695-000',
    address: 'Rua Anselmo Leandro',
    addressNumber: '108',
    addressComplement: 'prox academia avanti',
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
    neighborhood: 'centro',
    city: 'Baraúna',
    state: 'RN',
  });
<<<<<<< HEAD
  const [stepThree, setStepThree] = React.useState(null);

  const handleStep = {
    next: () => setStep(step + 1),
    submit: () => handleSubmit({ stepOne, stepTwo, stepThree }),
=======

  const [stepThree, setStepThree] = React.useState(null);

  const handleStep = (type) => {
    switch (type) {
      case 'next':
        setStep(step + 1);
        break;
      case 'back':
        setStep(step - 1);
        break;
      case 'submit':
        handleSubmit();
      default:
        break;
    }
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
  };

  const renderDots = () => {
    const array = [];
<<<<<<< HEAD
    for (let i = 0; i < 17; i++) array.push(<BsDot />);
=======
    for (let i = 0; i < 50; i++) {
      array.push(<BsDot />);
    }
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9

    return array.map((arr, i) => (
      <div key={i} className='createAccount__stepsIndicator__dots__dot'>
        {arr}
      </div>
    ));
  };

<<<<<<< HEAD
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
=======
  const handleSubmit = () => {
    console.log('form enviado');
  };  
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9

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
<<<<<<< HEAD
            gender={stepOne.gender}
=======
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
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
<<<<<<< HEAD
          disabled={
            (step === 1 && !stepOne) ||
            (step === 2 && !stepTwo) ||
            (step === 3 && !stepThree)
          }
          onClick={() => (step === 3 ? handleStep.submit() : handleStep.next())}
=======
          disabled={(step === 1 && !stepOne) || (step === 2 && !stepTwo)}
          onClick={() =>
            step === 3 ? handleStep('submit') : handleStep('next')
          }
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
        >
          {(step === 1 || step === 2) && 'Avançar'}
          {step === 3 && 'Finalizar'}
        </button>
<<<<<<< HEAD
=======
        {(step === 2 || step === 3) && (
          <button
            className='createAccount__footer__button createAccount__footer__button--backStep'
            onClick={() => handleStep('back')}
          >
            Voltar
          </button>
        )}
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
      </div>
    </div>
  );
};

export default CreateAccount;
