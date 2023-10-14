<<<<<<< HEAD
'use client';

import React from 'react';
import Image from 'next/image';
import marker from '@/assets/images/marker.svg';
import home from '@/assets/images/icons/home.svg';
import homeShadow from '@/assets/images/icons/homeShadow.svg';
import calendar from '@/assets/images/icons/calendar.svg';
import calendarShadow from '@/assets/images/icons/calendarShadow.svg';
import maps from '@/assets/images/icons/maps.svg';
import mapsShadow from '@/assets/images/icons/mapsShadow.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/Footer/Footer.scss';

const Footer = () => {
  const [showFooter, setShowFooter] = React.useState(true);
  const pathname = usePathname();
  const noFooterRoutes = React.useMemo(() => {
    return [{ name: 'login', path: '/login' }];
  }, []);

  React.useEffect(() => {
    const canShowFooter = noFooterRoutes.find(
      (route) => route.path === pathname
    );
    if (canShowFooter) setShowFooter(false);
  }, [noFooterRoutes, pathname]);

  if (showFooter)
    return (
      <footer className='footer'>
        <nav className='footer__nav'>
          <ul className='footer__nav__list'>
            <li className='footer__nav__list__item'>
              <Link className='footer__nav__list__item__link' href='/'>
                <Image src={home} alt='' />
                <Image src={homeShadow} alt='' />
              </Link>
            </li>
            <li className='footer__nav__list__item'>
              <Link className='footer__nav__list__item__link' href='/'>
                <Image src={calendar} alt='' />
                <Image src={calendarShadow} alt='' />
              </Link>
            </li>
            <li className='footer__nav__list__item'>
              <Link className='footer__nav__list__item__link' href='/'>
                <Image src={maps} alt='' />
                <Image src={mapsShadow} alt='' />
              </Link>
            </li>
          </ul>
        </nav>
        <div className='footer__marker'>
          <Image src={marker} alt='' />
        </div>
      </footer>
    );
=======
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
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
};

export default Footer;
