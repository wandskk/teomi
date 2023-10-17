import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profileMan from '@/assets/images/man.svg';
import { FiMenu } from 'react-icons/fi';
import { VscSignOut } from 'react-icons/vsc';
import { AiOutlineClose } from 'react-icons/ai';
import { UserContext } from '@/context/UserContext';
import { convert64ToUrl } from '@/resources/helpers/image/convert64ToUrl';
import { name } from '@/resources/helpers/name/name';
import { usePathname } from 'next/navigation';
import '@/styles/SideBar/SideBar.scss';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userPhoto, setUserPhoto] = React.useState(null);
  const { userData, logout } = React.useContext(UserContext);
  const pathname = usePathname();

  React.useEffect(() => setMenuOpen(false), [pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  React.useEffect(() => {
    if (userData) {
      const imageUrl = convert64ToUrl(userData.userphoto);
      setUserPhoto(imageUrl);
    }
  }, [userData]);
  return (
    <>
      <div className='sidebar__hamburger-icon' onClick={toggleMenu}>
        <FiMenu />
      </div>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className='sidebar__header'>
          <div className='sidebar__header__profile'>
            {/* {!userPhoto ? (
              <Image
                src={userPhoto}
                alt='Foto do usuário'
                width={128}
                height={128}
              />
            ) : ( */}
            {userData && (
              <Image
                src={profileMan}
                width={64}
                height={64}
                alt='Foto do usuário'
              />
            )}
            {/* )} */}
            <p>{userData ? name.getFirstName(userData.name) : ''}</p>
          </div>
          <div className='sidebar__header__close' onClick={toggleMenu}>
            <AiOutlineClose />
          </div>
        </div>
        <div className='sidebar__menu'>
          {userData ? (
            <>
              <Link href='/'>Configurações</Link>
              <Link href='/'>Conta</Link>
            </>
          ) : (
            <>
              <Link href='/login'>Login</Link>
              <Link href='/create-account'>Cadastre-se</Link>
            </>
          )}
          <Link href='/about'>Sobre</Link>
        </div>
        {userData && (
          <div className='sidebar__exit' onClick={logout}>
            Sair <VscSignOut />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
