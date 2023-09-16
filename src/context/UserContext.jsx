'use client';
import React from 'react';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
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
};
