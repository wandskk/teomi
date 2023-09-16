import React from 'react';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepTwo = () => {
  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='cep'>CEP</label>
        <input type='text' id='cep' name='cep' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='address'>Endereço</label>
        <input type='password' id='address' name='address' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='confirmPassword'>Confirma</label>
        <input type='password' id='confirmPassword' name='confirmPassword' />
      </div>

      <div class='createAccountSteps__twoInputs'>
        <div className='createAccountSteps__inputAndLabel'>
          <label htmlFor='addressNumber'>Número</label>
          <input type='text' id='addressNumber' name='addressNumber' />
        </div>

        <div className='createAccountSteps__inputAndLabel'>
          <label htmlFor='addresscomplement'>Complemento</label>
          <input type='text' id='addresscomplement' name='addresscomplement' />
        </div>
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='neighborhood'>Bairro</label>
        <input type='text' id='neighborhood' name='neighborhood' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='city'>Cidade</label>
        <input type='text' id='city' name='city' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='state'>Estado</label>
        <input type='text' id='state' name='state' />
      </div>
    </div>
  );
};

export default CreateAccountStepTwo;
