import React from 'react';
import Image from 'next/image';
import homeBanner from '../../assets/images/homeBanner.svg';
import homeBallon from '../../assets/images/homeBallon.svg';
import homeMan from '../../assets/images/homeMan.svg';
import homeWoman from '../../assets/images/homeWoman.svg';
import homeLgbt from '../../assets/images/homeLgbt.svg';
import homeAll from '../../assets/images/homeAll.svg';
import '@/styles/Home/Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__header'>
        <h2 className='home__header__title'>Olá, {'user'}</h2>
        <p className='home__header__subtitle'>Como podemos te apoiar?</p>
        <div
          className='home__header__banner'
          style={{ backgroundImage: `url("${homeBanner.src}")` }}
        >
          <p>Ajuda</p>
          <p>IMEDIATA</p>
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
        <div
          className='home__cards__card'
          style={{ backgroundImage: `url("${homeMan.src}")` }}
        >
          <p className='home__cards__card__title'>Homem</p>
          <small>15 disponíveis</small>
        </div>
        <div
          className='home__cards__card'
          style={{ backgroundImage: `url("${homeWoman.src}")` }}
        >
          <p className='home__cards__card__title'>Mulher</p>
          <small>9 disponíveis</small>
        </div>
        <div
          className='home__cards__card'
          style={{ backgroundImage: `url("${homeLgbt.src}")` }}
        >
          <p className='home__cards__card__title'>LGBTQI+</p>
          <small>9 disponíveis</small>
        </div>
        <div
          className='home__cards__card'
          style={{ backgroundImage: `url("${homeAll.src}")` }}
        >
          <p className='home__cards__card__title'>Todos</p>
          <small>33 disponíveis</small>
        </div>
      </div>
    </div>
  );
};

export default Home;
