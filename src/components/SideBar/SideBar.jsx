import React from "react";
import Link from "next/link";
import person from "@/assets/images/icons/person.png";
import { FiMenu } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import { UserContext } from "@/context/UserContext";
import { name } from "@/resources/helpers/name/name";
import { CSSTransition } from "react-transition-group";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import "@/styles/SideBar/SideBar.scss";

const Sidebar = () => {
  const { userData, userDataDecode, logout } = React.useContext(UserContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const isProfessionalOrAttedant =
    userDataDecode?.userType === 2 || userDataDecode?.userType === 3;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  React.useEffect(() => setMenuOpen(false), [pathname]);

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
          <div className="sidebar__content">
            <div className="sidebar__header">
              <div className="sidebar__header__profile">
                {userData && (
                  <div
                    className="sidebar__header__profile__photo"
                    style={{
                      backgroundImage: `url(${
                        userData.userphoto === null
                          ? person
                          : userData.userphoto
                      })`,
                    }}
                  />
                )}
                <p>{userData ? name.getFirstName(userData.name) : ""}</p>

                {userData && (
                  <div
                    className="sidebar__header__exit"
                    onClick={() => logout(userData.id ?? null)}
                  >
                    Sair <VscSignOut />
                  </div>
                )}
              </div>
              <div className="sidebar__header__close" onClick={toggleMenu}>
                <MdClose />
              </div>
            </div>
            <div className="sidebar__menu">
              {/* Menu profissional ou atendente logado */}
              {userDataDecode && isProfessionalOrAttedant && (
                <>
                  <Link href="/attendant-account">Conta</Link>
                  <Link href="/attendant-agenda/inPerson">
                    Agenda presencial
                  </Link>
                  <Link href="/attendant-agenda/online">Agenda online</Link>
                  <Link href="/attendant-locations">Meus locais</Link>
                </>
              )}

              {/* Menu paciente logado */}
              {userDataDecode && !isProfessionalOrAttedant && (
                <>
                  <Link href="/account">Conta</Link>
                </>
              )}

              {/* Menu deslogado */}
              {!userDataDecode && (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/create-account">Cadastre-se</Link>
                </>
              )}

              {/* Itens comuns do menu */}
              <Link href="/about">Sobre</Link>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
