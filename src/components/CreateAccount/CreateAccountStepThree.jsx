import React from 'react';
import profileImage from '@/assets/images/man.png';
import Image from 'next/image';
import { AiFillCamera } from 'react-icons/ai';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepThree = () => {
  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__profile'>
        <div className='createAccountSteps__profile__container'>
          <Image
            className='createAccountSteps__profile__image'
            src={profileImage}
            alt='Imagem de perfil'
          />
          <label htmlFor='profilePhoto'>
            <input type='file' name='profilePhoto' id='profilePhoto' />
            <AiFillCamera />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountStepThree;
