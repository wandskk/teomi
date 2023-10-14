'use client';

import Home from '@/components/Home/Home';
import PrivateRoutes from '@/components/PrivateRoute/PrivateRoute';

export default function Index() {
  return (
    <PrivateRoutes>
      <Home />
    </PrivateRoutes>
  );
}
