"use client";
import React from "react";
import SideBar from "@/components/SideBar/SideBar";
import { AiOutlineLeft } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import "@/styles/Header/Header.scss";

const Header = () => {
  const [canSeeBackPage, setCanSeeBackPage] = React.useState(true);
  const [canSeeSideMenu, setCanSeeSideMenu] = React.useState(true);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (pathname === "/") setCanSeeBackPage(false);
    else setCanSeeBackPage(true);

    if (pathname === "/login" || pathname === "/create-account")
      setCanSeeSideMenu(false);
    else setCanSeeSideMenu(true);
  }, [pathname]);  

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            {canSeeBackPage ? (
              <button onClick={() => router.back()}>
                <AiOutlineLeft />
              </button>
            ) : (
              " "
            )}
          </li>
          <li>{canSeeSideMenu ? <SideBar /> : " "}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
