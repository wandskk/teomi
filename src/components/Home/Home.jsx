"use client";

import React from "react";
import Image from "next/image";
import flower from "@/assets/images/flower.svg";
import homeBanner from "@/assets/images/homeBanner.svg";
import homeBallon from "@/assets/images/homeBallon.svg";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { name } from "@/resources/helpers/name/name";
import { ChatServices } from "@/services/modules/chat";
import "@/styles/Home/Home.scss";

const Home = () => {
  const [categories, setCategories] = React.useState(null);
  const { userData, connectID } = React.useContext(UserContext);

  const getCategories = React.useCallback(async (token) => {
    try {
      const categories = await ChatServices.getCategories(token);
      setCategories(categories);
    } catch (error) {}
  }, []);

  React.useEffect(() => {
    if (connectID) getCategories(connectID);
  }, [connectID, getCategories]);

  return (
    <div className="home">
      <div className="home__header">
        <Image src={flower} alt="flower" className="home__header__flower" />
        <h2 className="home__header__title">
          {userData ? `Olá, ${name.getFirstName(userData?.name)}` : "Olá"}
        </h2>
        <p className="home__header__subtitle">Como podemos te apoiar?</p>
        <div className="home__header__banner">
          <div className="home__header__banner__text">
            <p>Ajuda</p>
            <p>IMEDIATA</p>
          </div>
          <Image
            className="home__header__banner__bnner"
            src={homeBanner.src}
            alt="banner"
            width={673}
            height={320}
            style={{ objectFit: "contain" }}
          />
          <Image
            src={homeBallon}
            alt="Ballon"
            className="home__header__banner__image"
          />
        </div>
      </div>
      <h3 className="home__text">
        Por favor, selecione a opção que melhor representa sua identidade.
      </h3>
      <div className="home__cards">
        {categories &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/professionals/${category.id}`}
              className="home__cards__card"
              style={{ backgroundImage: `url(${category.imageURL})` }}
            >
              <div className="home__cards__card__text">
                <p className="home__cards__card__title">{category.name}</p>
                <small>
                  {category.attendantsAvailable > 0
                    ? `${category.attendantsAvailable} ${
                        category.attendantsAvailable > 1
                          ? "disponíveis"
                          : "disponível"
                      }`
                    : "Nenhum atendende disponível"}
                </small>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
