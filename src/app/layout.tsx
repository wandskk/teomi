<<<<<<< HEAD
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SplashScreen from '@/components/SplashScreen/SplashScreen';
import CustomLoader from '@/components/Loader/CustomLoader';
import Flower from '@/components/Flower/Flower';
import Loading from '@/app/loading';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserStorage } from '../context/UserContext';
import { Suspense } from 'react';
=======
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserStorage } from '../context/UserContext';
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
import './globals.css';
import 'normalize.css/normalize.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teomi',
  description: 'Teomi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <UserStorage>
<<<<<<< HEAD
        <Suspense fallback={<Loading />}>
          <body className={inter.className} suppressHydrationWarning={true}>
            <Header />
            <main>{children}</main>
            <Flower />
            <Footer />
            <SplashScreen />
            <CustomLoader />
          </body>
        </Suspense>
=======
        <body className={inter.className} suppressHydrationWarning={true}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
>>>>>>> ac23fe29a783e194d0fae99c4b3ce166100b54d9
      </UserStorage>
    </html>
  );
}
