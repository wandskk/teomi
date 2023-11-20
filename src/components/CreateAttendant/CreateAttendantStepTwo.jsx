import React from "react";
import { useFormik } from "formik";
import { schema } from "./schemas/formStepTwo";
import { UserContext } from "@/context/UserContext";
import "@/styles/CreateAttendant/CreateAttendantSteps.scss";
import ReactInputMask from "react-input-mask";

const CreateAttendantStepTwo = ({ stepValues, setStepValues, edit }) => {
  const { connectID, setLoading, userData, userToken } =
    React.useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      cpf: stepValues?.cpf ?? "",
      rg: stepValues?.rg ?? "",
      role: stepValues?.role ?? "",
      registerNumber: stepValues?.registerNumber ?? "",
      occupationArea: stepValues?.occupationArea ?? "",
    },
    validateOnMount: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema: schema,
  });

  React.useEffect(() => {
    if (formik.isValid) setStepValues(formik.values);
  }, [formik]);

  React.useEffect(() => {
    if (edit && userData) {
      formik.setFieldValue("cpf", userData.cpf);
      formik.setFieldValue("rg", userData.rg);
      formik.setFieldValue("role", userData.role);
      formik.setFieldValue("registerNumber", userData.registerNumber);
      formik.setFieldValue("occupationArea", userData.occupationArea);
    }
  }, [edit, userData]);

  return (
    <div className="createAttendantSteps">
      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="cpf">CPF</label>
        <ReactInputMask
          mask="999.999.999-99"
          id="cpf"
          name="cpf"
          value={formik.values.cpf}
          onChange={formik.handleChange("cpf")}
          onBlur={formik.handleBlur("cpf")}
          className={
            formik.touched.cpf &&
            formik.errors.cpf &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />

        {formik.touched.cpf && formik.errors.cpf && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.cpf}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="rg">RG</label>
        <input
          type="text"
          id="rg"
          name="rg"
          value={formik.values.rg}
          onChange={formik.handleChange("rg")}
          onBlur={formik.handleBlur("rg")}
          className={
            formik.touched.rg &&
            formik.errors.rg &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.rg && formik.errors.rg && (
          <p className="createAttendantSteps__inputError">{formik.errors.rg}</p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="role">Especialidade</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange("role")}
          onBlur={formik.handleBlur("role")}
          className={
            formik.touched.role &&
            formik.errors.role &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.role && formik.errors.role && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.role}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="registerNumber">Número do Registro</label>
        <input
          type="text"
          id="registerNumber"
          name="registerNumber"
          value={formik.values.registerNumber}
          onChange={formik.handleChange("registerNumber")}
          onBlur={formik.handleBlur("registerNumber")}
          className={
            formik.touched.registerNumber &&
            formik.errors.registerNumber &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.registerNumber && formik.errors.registerNumber && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.registerNumber}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="occupationArea">Area de Atuação</label>
        <input
          type="text"
          id="occupationArea"
          name="occupationArea"
          value={formik.values.occupationArea}
          onChange={formik.handleChange("occupationArea")}
          onBlur={formik.handleBlur("occupationArea")}
          className={
            formik.touched.occupationArea &&
            formik.errors.occupationArea &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.occupationArea && formik.errors.occupationArea && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.occupationArea}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAttendantStepTwo;
