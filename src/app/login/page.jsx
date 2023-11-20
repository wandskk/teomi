"use client";
import React from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";
import "./page.scss";

const backToLink = {
  "scheduling-online": "/scheduling/online",
  "scheduling-inPerson": "/scheduling/inPerson",
};

const Page = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState(null);
  const [remeberMe, setRemeberMe] = React.useState(false);
  const { userLogin, setLoading } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const search = searchParams.get("backToLink");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorLogin(null);
    try {
      const redirect = search ? backToLink[search] : null;
      const login = await userLogin(email, password, redirect);
      if (login.message) {
        setLoading(false);
        setErrorLogin(login.message);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (remeberMe && localStorage) {
        localStorage.setItem("email", email);
      }
    }
  }, [remeberMe, email]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const existRememberEmail = localStorage.getItem("email");

      if (existRememberEmail) {
        setEmail(existRememberEmail);
        setRemeberMe(true);
      }
    }
  }, []);

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">Faça seu login</h1>
      <p className="loginForm__subtitle">
        Não tem uma conta?
        <Link
          href={
            search ? `/create-account?backToLink=${search}` : "/create-account"
          }
          className="loginForm__subtitle__link"
        >
          Inscrever-se
        </Link>
      </p>
      <form onSubmit={handleSubmit} className="loginForm__form">
        <div>
          <input
            className="loginForm__form__input"
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="e-mail"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            className="loginForm__form__input"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="senha"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <p className="loginForm__form__error">{errorLogin}</p>
        <div className="loginForm__form__actions">
          <label
            htmlFor="remember"
            className="loginForm__form__actions__remember"
          >
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={remeberMe}
              value={remeberMe}
              onChange={() => setRemeberMe(!remeberMe)}
            />
            Lembrar-me
          </label>
          <Link
            className="loginForm__form__actions__forgot"
            href="/forgot-password"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <button className="loginForm__form__submit" type="submit">
          Continuar
        </button>

        <div className="loginForm__footerActions">
          <p className="loginForm__footerActions__text">Não tem uma conta?</p>
          <Link
            className="loginForm__footerActions__create-account"
            href={
              search
                ? `/create-account?backToLink=${search}`
                : "/create-account"
            }
          >
            Inscreva-se
          </Link>
        </div>

        <div className="loginForm__footerActions">
          <p className="loginForm__footerActions__text">
            É um profissional e não possui conta?
          </p>
          <Link
            className="loginForm__footerActions__create-account"
            href="/create-attendant"
          >
            Inscreva-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
