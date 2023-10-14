'use client';
<<<<<<< HEAD

import React from 'react';
import decode from 'jwt-decode';
import { AuthServices } from '@/services/modules/auth';
import { UsersServices } from '@/services/modules/users';
import { getCookie } from '@/resources/helpers/cookies/getCookie';
import { setCookie } from '@/resources/helpers/cookies/setCookie';
=======
import React from 'react';
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
<<<<<<< HEAD
  const [connectID, setConnectID] = React.useState(null);
  const [userToken, setUserToken] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [logged, setLogged] = React.useState(null);
  const [splashScreen, setSplashScreen] = React.useState(true);
  const tokenAuth = process.env.NEXT_PUBLIC_SECRET_KEY;

  async function userLogin(email, password) {
    const cookie = getCookie('userLogin');
    if (!cookie)
      try {
        const login = await UsersServices.userLogin(
          { email, password },
          connectID
        );
        const { token, expiresIn } = login.data;
        setCookie('userLogin', token, expiresIn);
        setUserToken(token);
      } catch (error) {
        return error.response.data;
      }
    else setUserToken(cookie);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const cookie = getCookie('connectID');
      if (!cookie)
        try {
          const tokenAutorization = await AuthServices.getAuthToken(tokenAuth);
          const { token, expiresIn } = tokenAutorization;
          setCookie('connectID', token, expiresIn);
          setConnectID(token);
        } catch (error) {}
      else setConnectID(cookie);

      setLoading(false);
    };

    fetchData();
  }, [tokenAuth]);

  React.useEffect(() => {
    const cookie = getCookie('userLogin');

    const fetchData = async (email, useruniqueid) => {
      try {
        const data = await UsersServices.getUserData(
          { email, secretKey: connectID },
          useruniqueid
        );

        setUserData(data);
      } catch (error) {}
    };

    if (cookie && userToken) {
      const { useremail } = decode(cookie);

      fetchData(useremail, cookie);
    }
  }, [userToken, connectID]);

  React.useEffect(() => {
    const cookie = getCookie('userLogin');
    cookie && setUserToken(cookie);
    !cookie && setLogged(false);
  }, []);

  React.useEffect(() => {
    userData && setLogged(true);
  }, [userData]);

  React.useEffect(() => setSplashScreen(false), []);  

  return (
    <UserContext.Provider
      value={{
        connectID,
        userData,
        loading,
        splashScreen,
        logged,
        userLogin,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
=======
  const [nav, setNav] = React.useState('teste');  

  //   const getToken = React.useCallback(() => {
  //     const tokenOnQuery = router.query.token;
  //     const tokenLocalStorage = localStorage.getItem('authToken');

  //     if (router.route === '/' && tokenOnQuery && !tokenLocalStorage) {
  //       localStorage.setItem('authToken', tokenOnQuery);
  //       setToken(tokenOnQuery);
  //     } else if (tokenLocalStorage) {
  //       setToken(tokenLocalStorage);
  //     } else {
  //       setIsLogged(false);
  //     }
  //   }, [router]);

  //   const authLogin = React.useCallback(async (token) => {
  //     setIsLogged(null);
  //     try {
  //       setLoading(true);
  //       const resToken = await AuthServices.getValidateToken(token);
  //       setIsLogged(true);
  //     } catch (error) {
  //       setIsLogged(false);
  //       localStorage.removeItem('authToken');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, []);

  //   React.useEffect(() => {
  //     if (!isLogged) {
  //       setNav(navegationApp[0]);
  //     } else {
  //       const navigation = navegationApp.filter(
  //         (nav) => nav.url === router.pathname
  //       )[0];

  //       setNav(navigation);
  //     }
  //   }, [router, isLogged]);

  //   React.useEffect(() => {
  //     getToken();
  //     if (token) authLogin(token);
  //   }, [token, authLogin, getToken]);

  return <UserContext.Provider value={{nav}}>{children}</UserContext.Provider>;
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
};
