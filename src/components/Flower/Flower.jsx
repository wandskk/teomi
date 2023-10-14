import Image from 'next/image';
import React from 'react';
import flower from '../../assets/images/flower.svg';
import '@/styles/Flower/Flower.scss';

const Flower = () => {
  return <Image src={flower} alt='Flower' className='flower' />;
};

export default Flower;
