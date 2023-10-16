import React from 'react';
import splashScreenImage from '@/assets/images/splashScreen.svg';
import Image from 'next/image';
import '@/styles/About/About.scss';

const About = () => {
  return (
    <div className='about'>
      <Image priority={true} src={splashScreenImage} alt='Splash Screen' />
      <p>Sobre o Aplicativo Teomi:</p>
      <p>
        O Teomi é seu companheiro confiável para cuidar do seu bem-estar
        psicológico. Nossa plataforma foi projetada para oferecer suporte
        emocional e orientação de maneira acessível e conveniente. Aqui está um
        pouco do que podemos fazer por você: Avaliação de Bem-Estar: Ao escolher
        o teste, você será direcionado para a avaliação K10, uma ferramenta
        eficaz que nos ajuda a entender seu nível de bem-estar psicológico. Essa
        escala nos permite identificar suas necessidades e recomendar o suporte
        apropriado.
      </p>
    </div>
  );
};

export default About;
