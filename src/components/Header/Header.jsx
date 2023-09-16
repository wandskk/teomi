'use client';
import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import './styles/Header.scss';
import { UserContext } from '@/context/UserContext';

const Header = () => {
  const { nav } = React.useContext(UserContext);

  React.useEffect(() => {}, [nav]);
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>
            <AiOutlineLeft />
          </li>
          <li></li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
