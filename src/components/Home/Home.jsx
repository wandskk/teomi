'use client';

import React from 'react';
import Image from 'next/image';
import flower from '@/assets/images/flower.svg';
import homeBanner from '@/assets/images/homeBanner.svg';
import homeBallon from '@/assets/images/homeBallon.svg';
import homeMan from '@/assets/images/homeMan.svg';
import homeWoman from '@/assets/images/homeWoman.svg';
import homeLgbt from '@/assets/images/homeLgbt.svg';
import homeAll from '@/assets/images/homeAll.svg';
import { UserContext } from '@/context/UserContext';
import { name } from '@/resources/helpers/name/name';
import '@/styles/Dashboard/Dashboard.scss';

const Home = () => {
  const { userData } = React.useContext(UserContext);

  return (
    <div className='home'>
      <div className='home__header'>
        <Image src={flower} alt='flower' className='home__header__flower' />
        <h2 className='home__header__title'>
        {userData ? `Olá, ${name.getFirstName(userData?.name)}` : 'Olá'}
        </h2>
        <p className='home__header__subtitle'>Como podemos te apoiar?</p>
        <div className='home__header__banner'>
          <div className='home__header__banner__text'>
            <p>Ajuda</p>
            <p>IMEDIATA</p>
          </div>
          <Image
            className='home__header__banner__bnner'
            src={homeBanner.src}
            alt='banner'
            width={673}
            height={320}
            style={{ objectFit: 'contain' }}
          />
          <Image
            src={homeBallon}
            alt='Ballon'
            className='home__header__banner__image'
          />
        </div>
      </div>
      <h3 className='home__text'>
        Por favor, selecione a opção que melhor representa sua identidade.
      </h3>
      <div className='home__cards'>
        <div className='home__cards__card'>
          <div className='home__cards__card__text'>
            <p className='home__cards__card__title'>Homem</p>
            <small>15 disponíveis</small>
          </div>
          <Image
            src={homeMan}
            alt='homem'
            width={328}
            height={346}
            className='home__cards__card__image'
          />
        </div>
        <div className='home__cards__card'>
          <div className='home__cards__card__text'>
            <p className='home__cards__card__title'>Mulher</p>
            <small>9 disponíveis</small>
          </div>
          <Image
            src={homeWoman}
            alt='homem'
            width={328}
            height={346}
            className='home__cards__card__image'
          />
        </div>
        <div className='home__cards__card'>
          <div className='home__cards__card__text'>
            <p className='home__cards__card__title'>LGBTQI+</p>
            <small>9 disponíveis</small>
          </div>
          <Image
            src={homeLgbt}
            alt='homem'
            width={328}
            height={346}
            className='home__cards__card__image'
          />
        </div>
        <div className='home__cards__card'>
          <div className='home__cards__card__text'>
            <p className='home__cards__card__title'>Todos</p>
            <small>33 disponíveis</small>
          </div>
          <Image
            src={homeAll}
            alt='homem'
            width={328}
            height={346}
            className='home__cards__card__image'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
