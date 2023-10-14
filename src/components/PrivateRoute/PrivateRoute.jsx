import React from 'react';
import { UserContext } from '@/context/UserContext';
import { redirect } from 'next/navigation';

const PrivateRoutes = ({ children }) => {
  const { logged } = React.useContext(UserContext);

  if (logged) {
    return <>{children}</>;
  } else if (logged === false) {
    return redirect('/login');
  }
};

export default PrivateRoutes;
