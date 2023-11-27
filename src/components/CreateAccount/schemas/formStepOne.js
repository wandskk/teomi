import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string().required("Preencha o campo de nome"),
  email: Yup.string().required("Preencha o campo de e-mail"),
  password: Yup.string()
    .required("Preencha o campo de senha")
    .min(8, "Mínimo de 8 caracteres"),
  confirmPassword: Yup.string()
    .required("Preencha o campo de confirmação de senha")
    .min(8, "Mínimo de 8 caracteres")
    .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais"),
  phone: Yup.string()
    .test("validatePhone", "O telefone informado é inválido.", (value) => {
      const phone = value.replace(/\D/g, "");
      if (phone.length === 11) return true;
      return true;
    })
    .required("Preencha o campo de telefone"),
  birthdate: Yup.string().required("Preencha o campo de data de nascimento"),
  gender: Yup.string().required("Selecione o campo de sexo"),
});
