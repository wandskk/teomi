import * as Yup from 'yup';

export const schema = Yup.object().shape({
<<<<<<< HEAD
  postalCode: Yup.string().required('Preencha o campo de cep'),
  address: Yup.string().required('Preencha o campo endereço'),
  number: Yup.string().required(
    'Preencha o campo de numero de endereço'
  ),
  complement: Yup.string().required('Preencha o campo complemento'),
=======
  cep: Yup.string().required('Preencha o campo de cep'),
  address: Yup.string().required('Preencha o campo endereço'),
  addressNumber: Yup.string().required(
    'Preencha o campo de numero de endereço'
  ),
  addressComplement: Yup.string().required('Preencha o campo complemento'),
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
  neighborhood: Yup.string().required('Preencha o campo bairro'),
  city: Yup.string().required('Preencha o campo de cidade'),
  state: Yup.string().required('Selecione o campo de estado'),
});
