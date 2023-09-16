import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().required('Preencha o campo de e-email'),
  password: Yup.string().required('Preencha o campo de senha'),
  confirmPassword: Yup.string().required(
    'Preencha o campo de confirmação de senha'
  ),
  telephone: Yup.string().required('Preencha o campo de telefone'),
  birthday: Yup.string().required('Preencha o campo de data de nascimento'),
  gender: Yup.string().required('Selecione o campo de sexo'),
});
