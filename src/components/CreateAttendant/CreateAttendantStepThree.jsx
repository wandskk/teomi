import React from "react";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { schema } from "./schemas/formStepThree";
import { formatCep } from "@/resources/helpers/cep/formatCep";
import { SystemServices } from "@/services/modules/system";
import { UserContext } from "@/context/UserContext";
import "@/styles/CreateAttendant/CreateAttendantSteps.scss";

const CreateAttendantStepThree = ({ stepValues, setStepValues, edit }) => {
  const { connectID, setLoading, userData, userToken } =
    React.useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      postalCode: stepValues?.postalCode ?? "",
      address: stepValues?.address ?? "",
      number: stepValues?.number ?? "",
      complement: stepValues?.complement ?? "",
      neighborhood: stepValues?.neighborhood ?? "",
      city: stepValues?.city ?? "",
      state: stepValues?.state ?? "",
    },
    validateOnMount: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema: schema,
  });

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

          logradouro && formik.setFieldValue("address", logradouro);
          complemento && formik.setFieldValue("complement", complemento);
          bairro && formik.setFieldValue("neighborhood", bairro);
          cidade && formik.setFieldValue("city", cidade);
          estado && formik.setFieldValue("state", estado);
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
  }, [formik]);

  React.useEffect(() => {
    const { postalCode } = formik.values;
    const unmaskedCep = formatCep.clear(postalCode);

    unmaskedCep.length === 8 && placeFieldsWithCep(unmaskedCep, connectID);
  }, [formik.values.postalCode]);

  React.useEffect(() => {
    if (edit && userData) {
      formik.setFieldValue("postalCode", userData.postalcode);
      formik.setFieldValue("address", userData.address);
      formik.setFieldValue("number", userData.number);
      formik.setFieldValue("complement", userData.complement);
      formik.setFieldValue("neighborhood", userData.neighborhood);
    }
  }, [edit, userData]);

  return (
    <div className="createAttendantSteps">
      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="cep">CEP</label>
        <InputMask
          mask="99999-999"
          maskChar="_"
          value={formik.values.postalCode}
          onChange={formik.handleChange("postalCode")}
          onBlur={formik.handleBlur("postalCode")}
          required
          className={
            formik.touched.postalCode &&
            formik.errors.postalCode &&
            "createAttendantSteps__inputInvalid"
          }
        />
        {formik.touched.postalCode && formik.errors.postalCode && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.postalCode}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="address">Endereço</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange("address")}
          onBlur={formik.handleBlur("address")}
          className={
            formik.touched.address &&
            formik.errors.address &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.address && formik.errors.address && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.address}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__twoInputs">
        <div className="createAttendantSteps__inputAndLabel">
          <label htmlFor="number">Número</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange("number")}
            onBlur={formik.handleBlur("number")}
            className={
              formik.touched.number &&
              formik.errors.number &&
              "createAttendantSteps__inputInvalid"
            }
            required
          />
          {formik.touched.number && formik.errors.number && (
            <p className="createAttendantSteps__inputError">
              {formik.errors.number}
            </p>
          )}
        </div>

        <div className="createAttendantSteps__inputAndLabel">
          <label htmlFor="complement">Complemento</label>
          <input
            type="text"
            id="complement"
            name="complement"
            value={formik.values.complement}
            onChange={formik.handleChange("complement")}
            onBlur={formik.handleBlur("complement")}
            className={
              formik.touched.complement &&
              formik.errors.complement &&
              "createAttendantSteps__inputInvalid"
            }
            required
          />
          {formik.touched.complement && formik.errors.complement && (
            <p className="createAttendantSteps__inputError">
              {formik.errors.complement}
            </p>
          )}
        </div>
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="neighborhood">Bairro</label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={formik.values.neighborhood}
          onChange={formik.handleChange("neighborhood")}
          onBlur={formik.handleBlur("neighborhood")}
          className={
            formik.touched.neighborhood &&
            formik.errors.neighborhood &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.neighborhood && formik.errors.neighborhood && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.neighborhood}
          </p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange("city")}
          onBlur={formik.handleBlur("city")}
          disabled
          className={
            formik.touched.city &&
            formik.errors.city &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.city && formik.errors.city && (
          <p className="createAttendantSteps__inputError">{formik.errors.city}</p>
        )}
      </div>

      <div className="createAttendantSteps__inputAndLabel">
        <label htmlFor="state">Estado</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange("state")}
          onBlur={formik.handleBlur("state")}
          disabled
          className={
            formik.touched.state &&
            formik.errors.state &&
            "createAttendantSteps__inputInvalid"
          }
          required
        />
        {formik.touched.state && formik.errors.state && (
          <p className="createAttendantSteps__inputError">
            {formik.errors.state}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAttendantStepThree;
