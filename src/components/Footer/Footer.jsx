"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import home from "@/assets/images/icons/home.svg";
import homeShadow from "@/assets/images/icons/homeShadow.svg";
import calendar from "@/assets/images/icons/calendar.svg";
import calendarShadow from "@/assets/images/icons/calendarShadow.svg";
import maps from "@/assets/images/icons/maps.svg";
import mapsShadow from "@/assets/images/icons/mapsShadow.svg";
import flower from "@/assets/images/flower.png";
import FooterMarker from "@/components/FooterMarker/FooterMarker";
import { usePathname } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import "@/styles/Footer/Footer.scss";

const noFooterRoutes = [
  { name: "login", path: "login" },
  { name: "chat", path: "chat" },
];

const Footer = () => {
  const [showFooter, setShowFooter] = React.useState(true);
  const { userData } = React.useContext(UserContext);
  const pathname = usePathname();

  const canShowFooter = noFooterRoutes.find((route) =>
    pathname.includes(route.path)
  );

  React.useEffect(() => {
    if (canShowFooter) setShowFooter(false);
    else setShowFooter(true);
  }, [noFooterRoutes]);

  if (showFooter)
    return (
      <footer className="footer">
        <nav className="footer__nav">
          <div className="footer__flower">
            <img
              className="footer__flower__image"
              src={flower.src}
              alt="florzinha"
            />
          </div>
          <ul className="footer__nav__list">
            <li className="footer__nav__list__item">
              <Link className="footer__nav__list__item__link" href="/">
                <Image src={home} alt="" />
                <Image src={homeShadow} alt="" />
              </Link>
            </li>
            <li className="footer__nav__list__item">
              <Link
                className="footer__nav__list__item__link"
                href={
                  userData?.usertype === 3 || userData?.usertype === 2
                    ? "/schedules-attendant/scheduled"
                    : "/schedules"
                }
              >
                <Image src={calendar} alt="" />
                <Image src={calendarShadow} alt="" />
              </Link>
            </li>
            {userData?.usertype === 3 || userData?.usertype === 2 ? (
              ""
            ) : (
              <li className="footer__nav__list__item">
                <Link
                  className="footer__nav__list__item__link"
                  href="/scheduling/inPerson"
                >
                  <Image src={maps} alt="" />
                  <Image src={mapsShadow} alt="" />
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="footer__marker">
          <FooterMarker />
        </div>
      </footer>
    );
};

export default Footer;
