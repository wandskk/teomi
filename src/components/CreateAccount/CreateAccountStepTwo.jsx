import React from 'react';
<<<<<<< HEAD
import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import { schema } from './schemas/formStepTwo';
import { formatCep } from '@/resources/helpers/cep/formatCep';
import { SystemServices } from '@/services/modules/system';
import { UserContext } from '@/context/UserContext';
import '@/styles/CreateAccount/CreateAccountSteps.scss';

const CreateAccountStepTwo = ({ stepValues, setStepValues }) => {
  const { connectID, setLoading } = React.useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      postalCode: stepValues?.postalCode ?? '',
      address: stepValues?.address ?? '',
      number: stepValues?.number ?? '',
      complement: stepValues?.complement ?? '',
=======
import { useFormik } from 'formik';
import { schema } from './schemas/formStepTwo';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepTwo = ({ stepValues, setStepValues }) => {
  const formik = useFormik({
    initialValues: {
      cep: stepValues?.cep ?? '',
      address: stepValues?.address ?? '',
      addressNumber: stepValues?.addressNumber ?? '',
      addressComplement: stepValues?.addressComplement ?? '',
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
      neighborhood: stepValues?.neighborhood ?? '',
      city: stepValues?.city ?? '',
      state: stepValues?.state ?? '',
    },
    validateOnMount: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema: schema,
  });

<<<<<<< HEAD
  const placeFieldsWithCep = React.useCallback(
    async (postalCode, connectID) => {
      setLoading(true);
      try {
        const postalCodeData = await SystemServices.getAddressByPostalCode(
          postalCode,
          connectID
        );
        const { message } = postalCodeData.data;

        if (message) {
          const {
            bairro,
            complemento,
            localidade: cidade,
            logradouro,
            uf: estado,
          } = message;

          logradouro && formik.setFieldValue('address', logradouro);
          complemento && formik.setFieldValue('complement', complemento);
          bairro && formik.setFieldValue('neighborhood', bairro);
          cidade && formik.setFieldValue('city', cidade);
          estado && formik.setFieldValue('state', estado);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [formik, setLoading]
  );

  React.useEffect(() => {
    if (formik.isValid) setStepValues(formik.values);
    else setStepValues(null);
  }, [formik]);

  React.useEffect(() => {
    const { postalCode } = formik.values;
    const unmaskedCep = formatCep.clear(postalCode);

    unmaskedCep.length === 8 && placeFieldsWithCep(unmaskedCep, connectID);
  }, [formik.values.postalCode]);

=======
  React.useEffect(() => {
    if (formik.isValid) {
      setStepValues(formik.values);
    } else {
      setStepValues(null);
    }
  }, [formik]);

>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='cep'>CEP</label>
<<<<<<< HEAD
        <InputMask
          mask='99999-999'
          maskChar='_'
          value={formik.values.postalCode}
          onChange={formik.handleChange('postalCode')}
          onBlur={formik.handleBlur('postalCode')}
          required
          className={
            formik.touched.postalCode &&
            formik.errors.postalCode &&
            'createAccountSteps__inputInvalid'
          }
        />
        {formik.touched.postalCode && formik.errors.postalCode && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.postalCode}
          </p>
=======
        <input
          type='text'
          id='cep'
          name='cep'
          value={formik.values.cep}
          onChange={formik.handleChange('cep')}
          onBlur={formik.handleBlur('cep')}
          className={
            formik.touched.cep &&
            formik.errors.cep &&
            'createAccountSteps__inputInvalid'
          }
          required
        />
        {formik.touched.cep && formik.errors.cep && (
          <p className='createAccountSteps__inputError'>{formik.errors.cep}</p>
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
        )}
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='address'>Endereço</label>
        <input
          type='text'
          id='address'
          name='address'
          value={formik.values.address}
          onChange={formik.handleChange('address')}
          onBlur={formik.handleBlur('address')}
          className={
            formik.touched.address &&
            formik.errors.address &&
            'createAccountSteps__inputInvalid'
          }
          required
        />
        {formik.touched.address && formik.errors.address && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.address}
          </p>
        )}
      </div>

      <div className='createAccountSteps__twoInputs'>
        <div className='createAccountSteps__inputAndLabel'>
<<<<<<< HEAD
          <label htmlFor='number'>Número</label>
          <input
            type='text'
            id='number'
            name='number'
            value={formik.values.number}
            onChange={formik.handleChange('number')}
            onBlur={formik.handleBlur('number')}
            className={
              formik.touched.number &&
              formik.errors.number &&
=======
          <label htmlFor='addressNumber'>Número</label>
          <input
            type='text'
            id='addressNumber'
            name='addressNumber'
            value={formik.values.addressNumber}
            onChange={formik.handleChange('addressNumber')}
            onBlur={formik.handleBlur('addressNumber')}
            className={
              formik.touched.addressNumber &&
              formik.errors.addressNumber &&
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
              'createAccountSteps__inputInvalid'
            }
            required
          />
<<<<<<< HEAD
          {formik.touched.number && formik.errors.number && (
            <p className='createAccountSteps__inputError'>
              {formik.errors.number}
=======
          {formik.touched.addressNumber && formik.errors.addressNumber && (
            <p className='createAccountSteps__inputError'>
              {formik.errors.addressNumber}
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
            </p>
          )}
        </div>

        <div className='createAccountSteps__inputAndLabel'>
<<<<<<< HEAD
          <label htmlFor='complement'>Complemento</label>
          <input
            type='text'
            id='complement'
            name='complement'
            value={formik.values.complement}
            onChange={formik.handleChange('complement')}
            onBlur={formik.handleBlur('complement')}
            className={
              formik.touched.complement &&
              formik.errors.complement &&
=======
          <label htmlFor='addressComplement'>Complemento</label>
          <input
            type='text'
            id='addressComplement'
            name='addressComplement'
            value={formik.values.addressComplement}
            onChange={formik.handleChange('addressComplement')}
            onBlur={formik.handleBlur('addressComplement')}
            className={
              formik.touched.addressComplement &&
              formik.errors.addressComplement &&
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
              'createAccountSteps__inputInvalid'
            }
            required
          />
<<<<<<< HEAD
          {formik.touched.complement && formik.errors.complement && (
            <p className='createAccountSteps__inputError'>
              {formik.errors.complement}
            </p>
          )}
=======
          {formik.touched.addressComplement &&
            formik.errors.addressComplement && (
              <p className='createAccountSteps__inputError'>
                {formik.errors.addressComplement}
              </p>
            )}
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
        </div>
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='neighborhood'>Bairro</label>
        <input
          type='text'
          id='neighborhood'
          name='neighborhood'
          value={formik.values.neighborhood}
          onChange={formik.handleChange('neighborhood')}
          onBlur={formik.handleBlur('neighborhood')}
          className={
            formik.touched.neighborhood &&
            formik.errors.neighborhood &&
            'createAccountSteps__inputInvalid'
          }
          required
        />
        {formik.touched.neighborhood && formik.errors.neighborhood && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.neighborhood}
          </p>
        )}
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='city'>Cidade</label>
        <input
          type='text'
          id='city'
          name='city'
          value={formik.values.city}
          onChange={formik.handleChange('city')}
          onBlur={formik.handleBlur('city')}
<<<<<<< HEAD
          disabled
=======
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
          className={
            formik.touched.city &&
            formik.errors.city &&
            'createAccountSteps__inputInvalid'
          }
          required
        />
        {formik.touched.city && formik.errors.city && (
          <p className='createAccountSteps__inputError'>{formik.errors.city}</p>
        )}
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='state'>Estado</label>
        <input
          type='text'
          id='state'
          name='state'
          value={formik.values.state}
          onChange={formik.handleChange('state')}
          onBlur={formik.handleBlur('state')}
<<<<<<< HEAD
          disabled
=======
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
          className={
            formik.touched.state &&
            formik.errors.state &&
            'createAccountSteps__inputInvalid'
          }
          required
        />
        {formik.touched.state && formik.errors.state && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.state}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAccountStepTwo;
