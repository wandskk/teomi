import React from 'react';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepOne = () => {
  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='email'>E-mail</label>
        <input type='text' id='email' name='email' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='password'>Senha</label>
        <input type='password' id='password' name='password' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='confirmPassword'>Confirma</label>
        <input type='password' id='confirmPassword' name='confirmPassword' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='telephone'>Telefone</label>
        <input type='text' id='telephone' name='telephone' />
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='birthday'>Data de nascimento</label>
        <input type='text' id='birthday' name='birthday' />
      </div>

      <div className='createAccountSteps__gender'>
        <p>Sexo</p>
        <label htmlFor=''>
          <input type='radio' name='' id='' />
          Masculino
        </label>
        <label htmlFor=''>
          <input type='radio' name='' id='' />
          Feminino
        </label>
        <label htmlFor=''>
          <input type='radio' name='' id='' />
          Prefiro não informar
        </label>
      </div>
    </div>
  );
};

export default CreateAccountStepOne;
