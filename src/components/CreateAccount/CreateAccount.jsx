'use client';
import React from 'react';
import CreateAccountStepOne from './CreateAccountStepOne';
import CreateAccountStepTwo from './CreateAccountStepTwo';
import CreateAccountStepThree from './CreateAccountStepThree';
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
    neighborhood: 'centro',
    city: 'Baraúna',
    state: 'RN',
  });

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
  };

  const renderDots = () => {
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push(<BsDot />);
    }

    return array.map((arr, i) => (
      <div key={i} className='createAccount__stepsIndicator__dots__dot'>
        {arr}
      </div>
    ));
  };

  const handleSubmit = () => {
    console.log('form enviado');
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
          disabled={(step === 1 && !stepOne) || (step === 2 && !stepTwo)}
          onClick={() =>
            step === 3 ? handleStep('submit') : handleStep('next')
          }
        >
          {(step === 1 || step === 2) && 'Avançar'}
          {step === 3 && 'Finalizar'}
        </button>
        {(step === 2 || step === 3) && (
          <button
            className='createAccount__footer__button createAccount__footer__button--backStep'
            onClick={() => handleStep('back')}
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
