import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "@/context/UserContext";
import { name } from "@/resources/helpers/name/name";
import { CSSTransition } from "react-transition-group";
import { usePathname } from "next/navigation";
import "@/styles/SideBar/SideBar.scss";

const Sidebar = () => {
  const { userData, logout } = React.useContext(UserContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userPhoto, setUserPhoto] = React.useState(null);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleBlockScroll = (handle) => {
    document.body.style.overflow = handle ? "hidden" : "";
  };

  React.useEffect(() => setMenuOpen(false), [pathname]);

  React.useEffect(() => {
    if (userData) setUserPhoto(userData.userphoto);
  }, [userData]);

  React.useEffect(() => {
    handleBlockScroll(menuOpen);
  }, [menuOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(".sidebar")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="sidebar__hamburger-icon" onClick={toggleMenu}>
        <FiMenu />
      </div>
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className={`sidebar ${menuOpen ? "open" : ""} fade-content`}>
          <div className="sidebar__header">
            <div className="sidebar__header__profile">
              {userData && userPhoto && (
                <Image
                  src={userPhoto}
                  width={64}
                  height={64}
                  alt="Foto do usuário"
                />
              )}
              <p>{userData ? name.getFirstName(userData.name) : ""}</p>
            </div>
            <div className="sidebar__header__close" onClick={toggleMenu}>
              <AiOutlineClose />
            </div>
          </div>
          <div className="sidebar__menu">
            {userData ? (
              <>
                <Link href="/">Configurações</Link>
                <Link href="/account">Conta</Link>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/create-account">Cadastre-se</Link>
              </>
            )}
            <Link href="/about">Sobre</Link>
          </div>
          {userData && (
            <div className="sidebar__exit" onClick={logout}>
              Sair <VscSignOut />
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
