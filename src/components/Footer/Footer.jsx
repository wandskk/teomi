"use client";

import React from "react";
import Image from "next/image";
import marker from "@/assets/images/marker.svg";
import home from "@/assets/images/icons/home.svg";
import homeShadow from "@/assets/images/icons/homeShadow.svg";
import calendar from "@/assets/images/icons/calendar.svg";
import calendarShadow from "@/assets/images/icons/calendarShadow.svg";
import maps from "@/assets/images/icons/maps.svg";
import mapsShadow from "@/assets/images/icons/mapsShadow.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/Footer/Footer.scss";

const Footer = () => {
  const [showFooter, setShowFooter] = React.useState(true);
  const pathname = usePathname();
  const noFooterRoutes = React.useMemo(() => {
    return [{ name: "login", path: "/login" }];
  }, []);

  React.useEffect(() => {
    const canShowFooter = noFooterRoutes.find(
      (route) => route.path === pathname
    );
    if (canShowFooter) setShowFooter(false);
    else setShowFooter(true);
  }, [noFooterRoutes, pathname]);

  if (showFooter)
    return (
      <footer className="footer">
        <nav className="footer__nav">
          <ul className="footer__nav__list">
            <li className="footer__nav__list__item">
              <Link className="footer__nav__list__item__link" href="/">
                <Image src={home} alt="" />
                <Image src={homeShadow} alt="" />
              </Link>
            </li>
            <li className="footer__nav__list__item">
              <Link className="footer__nav__list__item__link" href="/schedules">
                <Image src={calendar} alt="" />
                <Image src={calendarShadow} alt="" />
              </Link>
            </li>
            <li className="footer__nav__list__item">
              <Link className="footer__nav__list__item__link" href="/">
                <Image src={maps} alt="" />
                <Image src={mapsShadow} alt="" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footer__marker">
          <Image src={marker} alt="" />
        </div>
      </footer>
    );
};

export default Footer;
