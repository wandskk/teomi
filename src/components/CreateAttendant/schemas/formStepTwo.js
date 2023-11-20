import * as Yup from "yup";
import { cpfValidator } from "@/resources/helpers/cpf/cpfValidator";

export const schema = Yup.object().shape({
  cpf: Yup.string()
    .required("Preencha o campo de cpf")
    .test("cpfValid", "O CPF informado é inválido.", (value) => {
      const cpf = value.replace(/[.-]/g, "");
      if (cpf.length === 11) {
        const cpfIsValid = cpfValidator(cpf);
        return cpfIsValid;
      } else return true;
    })
    .min(14, "No mínimo 11 caracteres."),
  rg: Yup.string()
    .required("Preencha o campo de rg")
    .min(6, "No mínimo 6 caracteres."),
  role: Yup.string().required("Preencha o campo de numero de especialidade"),
  registerNumber: Yup.string().required(
    "Preencha o campo do número de registro"
  ),
  occupationArea: Yup.string().required("Preencha o campo de area de ocupação"),
});
