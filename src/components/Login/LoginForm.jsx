'use client';
import React from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { UserContext } from '@/context/UserContext';
import '@/styles/Login/LoginForm.scss';

function LoginForm() {
  const [email, setEmail] = React.useState('teste@teste.com');
  const [password, setPassword] = React.useState('igor1231');
  const [errorLogin, setErrorLogin] = React.useState(null);
  const { userLogin, setLoading } = React.useContext(UserContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorLogin(null);

    try {
      const login = await userLogin(email, password);
      if (login.message) {
        setErrorLogin(login.message);
        setLoading(false);
      }
    } catch (error) {}
  }
=======
import './styles/LoginForm.scss';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9

  return (
    <div className='loginForm'>
      <h1 className='loginForm__title'>Faça seu login</h1>
      <p className='loginForm__subtitle'>
<<<<<<< HEAD
        Não tem uma conta? {' '}
=======
        Não tem uma conta?{' '}
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
        <Link href='/create-account' className='loginForm__subtitle__link'>
          Inscrever-se
        </Link>
      </p>
      <form onSubmit={handleSubmit} className='loginForm__form'>
        <div>
          <input
            className='loginForm__form__input'
            type='email'
            id='email'
            name='email'
            value={email}
            placeholder='e-mail'
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            className='loginForm__form__input'
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='senha'
            onChange={handlePasswordChange}
            required
          />
        </div>
<<<<<<< HEAD
        <p className='loginForm__form__error'>{errorLogin}</p>
=======

>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
        <div className='loginForm__form__actions'>
          <label
            htmlFor='remember'
            className='loginForm__form__actions__remember'
          >
            <input type='checkbox' name='remember' id='remember' />
            Lembrar-me
          </label>
          <Link
            className='loginForm__form__actions__forgot'
            href='/forgot-password'
          >
            Esqueceu a senha?
          </Link>
        </div>
        <button className='loginForm__form__submit' type='submit'>
          Continuar
        </button>

        <div className='loginForm__footerActions'>
          <p className='loginForm__footerActions__text'>Não tem uma conta?</p>
          <Link
            className='loginForm__footerActions__create-account'
            href='/create-account'
          >
            Inscreva-se
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
