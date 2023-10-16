'use client';
import React from 'react';
import SideBar from '@/components/SideBar/SideBar';
import { AiOutlineLeft } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import '@/styles/Header/Header.scss';
import Link from 'next/link';

const Header = () => {
  const [canSeeBackPage, setCanSeeBackPage] = React.useState(true);
  const [canSeeSideMenu, setCanSeeSideMenu] = React.useState(true);
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === '/dashboard') setCanSeeBackPage(false);
    else setCanSeeBackPage(true);
    if (pathname === '/' || pathname === '/create-account')
      setCanSeeSideMenu(false);
  }, [pathname]);
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>
            {canSeeBackPage ? (
              <Link href='/dashboard'>
                <AiOutlineLeft />
              </Link>
            ) : (
              ' '
            )}
          </li>
          <li>{canSeeSideMenu ? <SideBar /> : ' '}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
