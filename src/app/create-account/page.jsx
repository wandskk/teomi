<<<<<<< HEAD
'use client';

import React from 'react';
import CreateAccount from '@/components/CreateAccount/CreateAccount';
import { UserContext } from '@/context/UserContext';
import { redirect } from 'next/navigation';

const Index = () => {
  const { logged } = React.useContext(UserContext);

  if (logged === false) return <CreateAccount />;
  else if (logged) return redirect('/');
};

export default Index;
=======
import React from 'react';
import CreateAccount from '@/components/CreateAccount/CreateAccount';

const index = () => {
  return <CreateAccount />;
};

export default index;
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
