import React from 'react';
<<<<<<< HEAD
import profileMan from '@/assets/images/man.svg';
import profileWoman from '@/assets/images/woman.svg';
import Image from 'next/image';
import { AiFillCamera } from 'react-icons/ai';
import '@/styles/CreateAccount/CreateAccountSteps.scss';

const CreateAccountStepThree = ({ gender, stepValues, setStepValues }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageChange = async (file) => {
=======
import profileImage from '@/assets/images/man.png';
import Image from 'next/image';
import { AiFillCamera } from 'react-icons/ai';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepThree = ({ stepValues, setStepValues }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageChange = (file) => {
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);

<<<<<<< HEAD
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        setStepValues(blob);
      };

=======
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
      setStepValues(file);
    } else {
      setStepValues(null);
      setSelectedImage(null);
    }
  };

  React.useState(() => {
<<<<<<< HEAD
    stepValues && handleImageChange(stepValues);
  }, [stepValues]);

  React.useEffect(() => {
    selectedImage && setStepValues(selectedImage);
  }, [selectedImage, setStepValues]);

=======
    if (stepValues) handleImageChange(stepValues);
  }, [stepValues]);

>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__profile'>
        <div className='createAccountSteps__profile__container'>
<<<<<<< HEAD
          <label htmlFor='profilePhoto'>
            {selectedImage ? (
              <Image
                className='createAccountSteps__profile__image'
                src={selectedImage}
                width={128}
                height={128}
                alt='Imagem de perfil'
              />
            ) : (
              <Image
                className='createAccountSteps__profile__image'
                src={gender === '2' ? profileWoman : profileMan}
                width={128}
                height={128}
                alt='Imagem de perfil'
              />
            )}
=======
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
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
            <input
              type='file'
              name='profilePhoto'
              id='profilePhoto'
              accept='image/*'
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
<<<<<<< HEAD
            <span className='createAccountSteps__profile__change'>
              <AiFillCamera />
            </span>
=======
            <AiFillCamera />
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountStepThree;
