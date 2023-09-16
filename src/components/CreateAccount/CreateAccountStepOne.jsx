import React from 'react';

import { useFormik } from 'formik';
import { schema } from './schemas/formStepOne';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './styles/CreateAccountSteps.scss';

const CreateAccountStepOne = ({ stepValues, setStepValues }) => {
  const formik = useFormik({
    initialValues: {
      email: stepValues?.email ?? '',
      password: stepValues?.password ?? '',
      confirmPassword: stepValues?.confirmPassword ?? '',
      telephone: stepValues?.telephone ?? '',
      birthday: stepValues?.birthday ?? '',
      gender: stepValues?.gender ?? '',
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

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='createAccountSteps'>
      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='email'>E-mail</label>
        <input
          type='text'
          id='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          className={
            formik.touched.email &&
            formik.errors.email &&
            'createAccountSteps__inputInvalid'
          }
          required
        />
        {formik.touched.email && formik.errors.email && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.email}
          </p>
        )}
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='password'>Senha</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          required
          className={
            formik.touched.password &&
            formik.errors.password &&
            'createAccountSteps__inputInvalid'
          }
        />
        {formik.touched.password && formik.errors.password && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.password}
          </p>
        )}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className='createAccountSteps__inputAndLabel__showPassword'
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='confirmPassword'>Confirma</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id='confirmPassword'
          name='confirmPassword'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          required
          className={
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword &&
            'createAccountSteps__inputInvalid'
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.confirmPassword}
          </p>
        )}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className='createAccountSteps__inputAndLabel__showPassword'
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='telephone'>Telefone</label>
        <input
          type='text'
          id='telephone'
          name='telephone'
          value={formik.values.telephone}
          onChange={formik.handleChange('telephone')}
          onBlur={formik.handleBlur('telephone')}
          required
          className={
            formik.touched.telephone &&
            formik.errors.telephone &&
            'createAccountSteps__inputInvalid'
          }
        />
        {formik.touched.telephone && formik.errors.telephone && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.telephone}
          </p>
        )}
      </div>

      <div className='createAccountSteps__inputAndLabel'>
        <label htmlFor='birthday'>Data de nascimento</label>
        <input
          type='text'
          id='birthday'
          name='birthday'
          value={formik.values.birthday}
          onChange={formik.handleChange('birthday')}
          onBlur={formik.handleBlur('birthday')}
          required
          className={
            formik.touched.birthday &&
            formik.errors.birthday &&
            'createAccountSteps__inputInvalid'
          }
        />
        {formik.touched.birthday && formik.errors.birthday && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.birthday}
          </p>
        )}
      </div>

      <div className='createAccountSteps__gender'>
        <p>Sexo</p>
        <label htmlFor='man'>
          <input
            type='radio'
            name='gender'
            id='man'
            value='man'
            onChange={formik.handleChange('gender')}
            onBlur={formik.handleBlur('gender')}
            checked={formik.values.gender === 'man'}
            required
          />
          Masculino
        </label>
        <label htmlFor='woman'>
          <input
            type='radio'
            name='gender'
            id='woman'
            value='woman'
            onChange={formik.handleChange('gender')}
            onBlur={formik.handleBlur('gender')}
            checked={formik.values.gender === 'woman'}
            required
          />
          Feminino
        </label>
        <label htmlFor='other'>
          <input
            type='radio'
            name='gender'
            id='other'
            value='other'
            onChange={formik.handleChange('gender')}
            onBlur={formik.handleBlur('gender')}
            checked={formik.values.gender === 'other'}
            required
          />
          Prefiro não informar
        </label>
        {formik.touched.gender && formik.errors.gender && (
          <p className='createAccountSteps__inputError'>
            {formik.errors.gender}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAccountStepOne;
