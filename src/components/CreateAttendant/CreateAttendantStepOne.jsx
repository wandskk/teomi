import React from "react";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { schema } from "./schemas/formStepOne";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SystemServices } from "@/services/modules/system";
import { validateEmail } from "@/resources/helpers/email/validateEmail";
import { UserContext } from "@/context/UserContext";
import { genderList } from "@/resources/utils/gender/genderList";
import "@/styles/CreateAttendant/CreateAttendantSteps.scss";

const CreateAttendantStepOne = ({ stepValues, setStepValues, edit = false }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const { connectID, userData } = React.useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      name: stepValues?.name ?? "",
      email: stepValues?.email ?? "",
      password: stepValues?.password ?? "",
      confirmPassword: stepValues?.confirmPassword ?? "",
      phone: stepValues?.phone ?? "",
      birthdate: stepValues?.birthdate ?? "",
      gender: stepValues?.gender ?? "",
    },
    validateOnMount: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema: schema,
  });

  const emailAlreadyExist = React.useCallback(async (email, connectID) => {
    setErrorEmail(null);
    try {
      const verifyEmail = await SystemServices.verifyEmailExist(
        email,
        connectID
      );
    } catch (error) {
      setErrorEmail("E-mail informado já existe.");
    }
  }, []);

  React.useEffect(() => {
    if (formik.isValid) setStepValues(formik.values);
  }, [formik]);

  React.useEffect(() => {
    const { email } = formik.values;
    const isValidEmail = validateEmail(email);
    setErrorEmail("");

    if (edit && email !== userData?.email) {
      isValidEmail && emailAlreadyExist(email, connectID);
    }
  }, [formik.values.email, edit, userData]);

  React.useEffect(() => {
    if (edit && userData) {
      formik.setFieldValue("name", userData.name);
      formik.setFieldValue("email", userData.email);
      formik.setFieldValue("password", userData.password);
      formik.setFieldValue("confirmPassword", userData.password);
      formik.setFieldValue("birthdate", userData.birthdate);
      formik.setFieldValue("phone", userData.phone);
      formik.setFieldValue("gender", userData.gender);
    }
  }, [userData, edit]);

  return (
    <div className="createAttendantSteps">
      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          className={
            formik.touched.name &&
            formik.errors.name &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.name && formik.errors.name && (
          <p className="createAttendantSteps__inputError">{formik.errors.name}</p>
        )}
      </div>
      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          className={
            ((formik.touched.email && formik.errors.email) || errorEmail) &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.email && formik.errors.email && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.email}
          </p>
        )}
        {errorEmail && (
          <p className="createAttendantSteps__inputError">{errorEmail}</p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="password">Senha</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          required
          className={
            formik.touched.password &&
            formik.errors.password &&
            "createAttendantSteps__inputInvalid"
          }
        />
        {formik.touched.password && formik.errors.password && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.password}
          </p>
        )}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="createAttendantSteps__inputAndLabel__showPassword"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="confirmPassword">Confirma</label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          required
          className={
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword &&
            "createAttendantSteps__inputInvalid"
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.confirmPassword}
          </p>
        )}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="createAttendantSteps__inputAndLabel__showPassword"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="phone">Telefone</label>
        <InputMask
          mask="(99) 99999-9999"
          maskChar="_"
          value={formik.values.phone}
          onChange={formik.handleChange("phone")}
          onBlur={formik.handleBlur("phone")}
          required
          className={
            formik.touched.phone &&
            formik.errors.phone &&
            "createAttendantSteps__inputInvalid"
          }
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.phone}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="birthdate">Data de nascimento</label>
        <InputMask
          mask="99/99/9999"
          maskChar="_"
          value={formik.values.birthdate}
          onChange={formik.handleChange("birthdate")}
          onBlur={formik.handleBlur("birthdate")}
          required
          className={
            formik.touched.birthdate &&
            formik.errors.birthdate &&
            "createAttendantSteps__inputInvalid"
          }
        />        
        {formik.touched.birthdate && formik.errors.birthdate && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.birthdate}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__gender">
        <p>Sexo</p>
        {genderList &&
          genderList.map((gender) => (
            <label htmlFor={gender.id} key={gender.name}>
              <input
                type="radio"
                name="gender"
                id={gender.id}
                value={gender.id}
                onChange={formik.handleChange("gender")}
                onBlur={formik.handleBlur("gender")}
                checked={formik.values.gender == gender.id}
                required
              />
              {gender.name}
            </label>
          ))}
        {formik.touched.gender && formik.errors.gender && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.gender}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAttendantStepOne;
