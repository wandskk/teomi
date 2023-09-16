import React from 'react';
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
      neighborhood: stepValues?.neighborhood ?? '',
      city: stepValues?.city ?? '',
      state: stepValues?.state ?? '',
    },
    validateOnMount: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema: schema,
  });

  React.useEffect(() => {
    if (formik.isValid) {
      setStepValues(formik.values);
    } else {
      setStepValues(null);
    }
  }, [formik]);

  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='cep'>CEP</label>
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
              'createAccountSteps__inputInvalid'
            }
            required
          />
          {formik.touched.addressNumber && formik.errors.addressNumber && (
            <p className='createAccountSteps__inputError'>
              {formik.errors.addressNumber}
            </p>
          )}
        </div>

        <div className='createAccountSteps__inputAndLabel'>
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
              'createAccountSteps__inputInvalid'
            }
            required
          />
          {formik.touched.addressComplement &&
            formik.errors.addressComplement && (
              <p className='createAccountSteps__inputError'>
                {formik.errors.addressComplement}
              </p>
            )}
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
