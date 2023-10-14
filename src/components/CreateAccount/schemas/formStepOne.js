import * as Yup from 'yup';

export const schema = Yup.object().shape({
<<<<<<< HEAD
  name: Yup.string().required('Preencha o campo de nome'),
  email: Yup.string().required('Preencha o campo de e-mail'),
  password: Yup.string()
    .required('Preencha o campo de senha')
    .min(8, 'Mínimo de 8 caracteres'),
  confirmPassword: Yup.string()
    .required('Preencha o campo de confirmação de senha')
    .min(8, 'Mínimo de 8 caracteres')
    .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais'),
  phone: Yup.string().required('Preencha o campo de telefone'),
  birthdate: Yup.string().required('Preencha o campo de data de nascimento'),
=======
  email: Yup.string().required('Preencha o campo de e-email'),
  password: Yup.string().required('Preencha o campo de senha'),
  confirmPassword: Yup.string().required(
    'Preencha o campo de confirmação de senha'
  ),
  telephone: Yup.string().required('Preencha o campo de telefone'),
  birthday: Yup.string().required('Preencha o campo de data de nascimento'),
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
  gender: Yup.string().required('Selecione o campo de sexo'),
});
