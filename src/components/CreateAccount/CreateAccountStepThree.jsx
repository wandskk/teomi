import React from 'react';
import profileImage from '@/assets/images/man.png';
import Image from 'next/image';
import { AiFillCamera } from 'react-icons/ai';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepThree = ({ stepValues, setStepValues }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);

      setStepValues(file);
      
    } else {
      setStepValues(null);
      setSelectedImage(null);
    }
  };

  React.useState(() => {
    if (stepValues) handleImageChange(stepValues);
  }, [stepValues]);

  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__profile'>
        <div className='createAccountSteps__profile__container'>
          {selectedImage ? (
            <Image
              className='createAccountSteps__profile__image'
              src={selectedImage}
              width={168}
              height={168}
              alt='Imagem de perfil'
            />
          ) : (
            <Image
              className='createAccountSteps__profile__image'
              src={profileImage}
              alt='Imagem de perfil'
            />
          )}
          <label htmlFor='profilePhoto'>
            <input
              type='file'
              name='profilePhoto'
              id='profilePhoto'
              accept='image/*'
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            <AiFillCamera />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountStepThree;
