'use client';
import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import '@/styles/Header/Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>
            <AiOutlineLeft />
          </li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
