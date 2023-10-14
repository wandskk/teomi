'use client';

import React from 'react';
import decode from 'jwt-decode';
import { AuthServices } from '@/services/modules/auth';
import { UsersServices } from '@/services/modules/users';
import { getCookie } from '@/resources/helpers/cookies/getCookie';
import { setCookie } from '@/resources/helpers/cookies/setCookie';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
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
        setLoading(true);
        setLogged(true);
        setUserData(data.data);
      } catch (error) {
        setLogged(false);
      } finally {
        setLoading(false);
      }
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

  React.useEffect(() => setSplashScreen(false), []);
  React.useEffect(() => setLoading(true), []);

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
};
