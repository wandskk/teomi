import * as Yup from 'yup';

export const schema = Yup.object().shape({
  postalCode: Yup.string().required('Preencha o campo de cep'),
  address: Yup.string().required('Preencha o campo endereço'),
  number: Yup.string().required(
    'Preencha o campo de numero de endereço'
  ),
  complement: Yup.string(),
  neighborhood: Yup.string().required('Preencha o campo bairro'),
  city: Yup.string().required('Preencha o campo de cidade'),
  state: Yup.string().required('Selecione o campo de estado'),
});
