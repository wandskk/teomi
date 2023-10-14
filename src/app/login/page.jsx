'use client';

import React from 'react';
import LoginForm from '@/components/Login/LoginForm';
import { UserContext } from '@/context/UserContext';
import { redirect } from 'next/navigation';

const Login = () => {
  const { logged } = React.useContext(UserContext);

  if (logged === false) return <LoginForm />;
  else if (logged) return redirect('/');
};

export default Login;
