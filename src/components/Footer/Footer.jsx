import React from 'react';
import { BsHouse, BsPerson, BsCalendar2Range } from 'react-icons/bs';
import { MdOutlinePlace } from 'react-icons/md';
import './styles/Footer.scss';
import Image from 'next/image';
import marker from '@/assets/images/marker.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <nav className='footer__nav'>
        <ul className='footer__nav__list'>
          <li className='footer__nav__list__item'>
            <BsHouse />
          </li>
          <li className='footer__nav__list__item'>
            <BsPerson />
          </li>
          <li className='footer__nav__list__item'>
            <MdOutlinePlace />
          </li>
          <li className='footer__nav__list__item'>
            <BsCalendar2Range />
          </li>
          <li className='footer__nav__list__item footer__nav__list__item--marker'>
            <Image src={marker} alt='marcador' width={120} height={100} />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
