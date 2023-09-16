'use client';
import React from 'react';
import CreateAccountStepOne from './CreateAccountStepOne';
import CreateAccountStepTwo from './CreateAccountStepTwo';
import CreateAccountStepThree from './CreateAccountStepThree';
import { BsDot } from 'react-icons/bs';
import './styles/CreateAccount.scss';

const CreateAccount = () => {
  const [step, setStep] = React.useState(3);
  const [formData, setFormData] = React.useState({
    stepOne: '1',
    stepTwo: '2',
    stepThree: '',
  });

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
        {step === 1 && <CreateAccountStepOne />}
        {step === 2 && <CreateAccountStepTwo />}
        {step === 3 && <CreateAccountStepThree />}
      </div>
      <div className='createAccount__footer'>
        <button
          className={`createAccount__footer__button ${
            step === 3 && 'createAccount__footer__button--submit'
          }`}
          disabled={
            (step === 1 && formData.stepOne.length < 1) ||
            (step === 2 && formData.stepTwo.length < 1) ||
            (step === 3 && formData.stepThree.length < 1)
          }
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
