"use client";

import React from "react";
import { hideEmail } from "@/resources/helpers/email/hideEmail";
import "./page.scss";
import { validateEmail } from "@/resources/helpers/email/validateEmail";
import { UsersServices } from "@/services/modules/users";
import { UserContext } from "@/context/UserContext";

const Page = () => {
  const { connectID, setLoading } = React.useContext(UserContext);
  const [isSenderedToken, setIsSenderedToken] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [hiddenEmail, setHiddenEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPassword, setErrorPassword] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [errorToken, setErrorToken] = React.useState(null);

  async function handleSubmit() {
    const isValidEmail = validateEmail(email);
    const isValidPassword = password.length > 0 && confirmPassword.length > 0;
    const isSamePassword = password === confirmPassword;
    const isValidPasswordFull = isValidPassword && isSamePassword;
    setErrorEmail(isValidEmail ? null : "Digite um e-mail válido");
    setErrorPassword(isValidPasswordFull ? null : "As senhas devem ser iguais");

    if (isValidEmail && isValidPasswordFull) {
      setLoading(true);
      try {
        const forgotPassword = await UsersServices.getTokenForgotPassword(
          { email, password },
          connectID
        );
        setIsSenderedToken(true);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  }

  async function validateTokenToUpdatePassword() {
    setErrorToken(null);
    setLoading(true);
    try {
      const verify = await UsersServices.verifyTokenForgotPassword(
        token,
        connectID
      );
      window.location.href = "/login";
    } catch (error) {
      const { message } = error.response.data;
      setErrorToken(message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
      const hiddenEmail = hideEmail(email);
      setHiddenEmail(hiddenEmail);
    }
  }, [email]);

  return (
    <section className="forgotPassword">
      {!isSenderedToken ? (
        <>
          <h1>Recuperação de senha</h1>
          <p>
            Para recuperar a senha, por favor, insira seu endereço de e-mail.
          </p>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              className={errorEmail?.length > 0 ? "error" : ""}
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required
            />
            {errorEmail && (
              <p className="forgotPassword__error">{errorEmail}</p>
            )}
            <input
              type="text"
              placeholder="Senha"
              className={errorPassword?.length > 0 ? "error" : ""}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
            <input
              type="text"
              placeholder="Confirma senha"
              className={errorPassword?.length > 0 ? "error" : ""}
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              required
            />
            {errorPassword && (
              <p className="forgotPassword__error">{errorPassword}</p>
            )}
          </div>
          <p>
            Nós lhe enviaremos um e-mail para definir ou redefinir sua nova
            senha ou e-mail
          </p>
          <button onClick={handleSubmit}>ENVIAR E-MAIL</button>
        </>
      ) : (
        <>
          <h1>Por favor, verifique a sua caixa de entrada </h1>
          <p>Por favor, verifique seu e-mail {hiddenEmail}</p>
          <div>
            <input
              type="text"
              placeholder="Insira o token aqui"
              className={errorToken?.length > 0 ? "error" : ""}
              value={token}
              onChange={({ target }) => setToken(target.value)}
            />
            {errorToken && (
              <p className="forgotPassword__error">{errorToken}</p>
            )}
          </div>
          <button onClick={validateTokenToUpdatePassword}>
            Validar e concluir
          </button>
        </>
      )}
    </section>
  );
};

export default Page;
