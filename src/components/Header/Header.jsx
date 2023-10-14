'use client';
import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
<<<<<<< HEAD
import { UserContext } from '@/context/UserContext';
import '@/styles/Header/Header.scss';

const Header = () => {
=======
import './styles/Header.scss';
import { UserContext } from '@/context/UserContext';

const Header = () => {
  const { nav } = React.useContext(UserContext);

  React.useEffect(() => {}, [nav]);
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>
            <AiOutlineLeft />
          </li>
<<<<<<< HEAD

=======
          <li></li>
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
