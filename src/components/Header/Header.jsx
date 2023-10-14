'use client';
import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import '@/styles/Header/Header.scss';

const Header = () => {
  const [canSeeBackPage, setCanSeeBackPage] = React.useState(true);
  const [canSeeSideMenu, setCanSeeSideMenu] = React.useState(true);
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === '/dashboard') setCanSeeBackPage(false);
    if (pathname === '/' || pathname === '/create-account')
      setCanSeeSideMenu(false);
  }, [pathname]);
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>{canSeeBackPage && <AiOutlineLeft />}</li>
          <li>{canSeeSideMenu && <FiMenu />}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
