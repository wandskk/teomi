"use client";

import React from "react";
import Image from "next/image";
import flower from "@/assets/images/flower.svg";
import homeBanner from "@/assets/images/homeBanner.svg";
import homeBallon from "@/assets/images/homeBallon.svg";
import teomi from "@/assets/images/teomi.png";
import person from "@/assets/images/icons/person.png";
import schedulesBanner from "@/assets/images/schedulesBanner.png";
import scheduledBanner from "@/assets/images/scheduledBanner.png";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { UserContext } from "@/context/UserContext";
import { name } from "@/resources/helpers/name/name";
import { ChatServices } from "@/services/modules/chat";
import { userTypes } from "@/resources/utils/userTypes/userTypes";
import { AttendantServices } from "@/services/modules/attendant";
import { io } from "socket.io-client";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { usePathname } from "next/navigation";
import "./page.scss";

const Page = () => {
  const { userDataDecode, userData, loading, setLoading, setIntervalHome } =
    React.useContext(UserContext);
  const [categories, setCategories] = React.useState(null);
  const [userType, setUserType] = React.useState("Paciente");
  const [queueList, setQueueList] = React.useState(null);
  const [queueListWithScheduled, setQueueListWithScheduled] =
    React.useState(null);
  const pathname = usePathname();
  const connectID = getCookie("connectID");
  const userLogin = getCookie("userLogin");
  const isProfessionalOrAttedant =
    userDataDecode.userType === 2 || userDataDecode.userType === 3;

  const getCategories = React.useCallback(async (token) => {
    try {
      const categories = await ChatServices.getCategories(token);
      setCategories(categories);
    } catch (error) {}
  }, []);

  async function getQueueList(attendantId, token) {
    try {
      const queueList = await AttendantServices.getQueueList(
        attendantId,
        token
      );

      setQueueList(queueList);
    } catch (error) {}
  }

  async function getQueueListWithScheduled(attendantId, token) {
    try {
      const queueList = await AttendantServices.getQueueListWithScheduled(
        attendantId,
        token
      );
      setQueueListWithScheduled(queueList);
    } catch (error) {}
  }

  async function goToChat(attendantId, patientId) {
    setLoading(true);
    try {
      const acceptChat = await AttendantServices.acceptChat(
        { attendantId, patientId },
        connectID
      );
    } catch (error) {
      if (error.response.status === 409) {
        const { chatId } = error.response.data;
        window.location.href = `/chat-attendant/${chatId}/${patientId}`;
      } else setLoading(false);
    }
  }

  React.useEffect(() => {
    if (connectID) getCategories(connectID);
  }, [connectID, getCategories]);

  React.useEffect(() => {
    if (userData) {
      const userType = userTypes.filter(
        (type) => type.id === userData.usertype
      )[0];
      setUserType(userType.name);
    }
  }, [userData]);

  React.useEffect(() => {
    if (isProfessionalOrAttedant) {
      getQueueList(userData.id, connectID);
      getQueueListWithScheduled(userData.id, connectID);

      const interval = setInterval(() => {
        getQueueList(userData.id, connectID);
        getQueueListWithScheduled(userData.id, connectID);
      }, 5000);
      setIntervalHome(interval);
    }
  }, [userType, pathname]);

  React.useEffect(() => {
    const socket = io("http://142.4.192.167:3001");

    socket.on("chatReadyAttendant", (data) => {
      let decodeUser = { id: null };
      if (userLogin) decodeUser = jwtDecode(userLogin);

      if (data.attendantId == decodeUser.userId) {
        window.location.href = `/chat-attendant/${data.chatId}/${data.patientId}`;
      }
    });

    return () => socket.disconnect();
  }, []);

  if (userData != null && !loading)
    return (
      <div className="home">
        <div className="home__header">
          <Image src={flower} alt="flower" className="home__header__flower" />
          <h2 className="home__header__title">
            {userData ? `Olá, ${name.getFirstName(userData?.name)}` : "Olá"}
          </h2>
          {isProfessionalOrAttedant ? (
            <>
              <p className="home__header__subtitle">
                Como podemos ajudar hoje?
              </p>
              <div className="home__header__banner">
                <div className="home__header__banner__text">
                  <Image src={teomi} alt="teomi" />
                </div>
                <Image
                  className="home__header__banner__bnner"
                  src={homeBanner.src}
                  alt="banner"
                  width={673}
                  height={320}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {isProfessionalOrAttedant ? (
          <>
            {queueList && (
              <>
                <h3 className="home__text">Atendimento imediato</h3>
                <div className="home__pacientsQueueList">
                  <ul className="home__pacientsQueueList__container">
                    {queueList &&
                      queueList.map((queue) => {
                        return (
                          <li
                            key={queue.userId}
                            className="home__pacientsQueueList__item"
                            onClick={() => goToChat(userData.id, queue.userId)}
                          >
                            <Image
                              src={queue.userphoto ?? person}
                              width={75}
                              height={75}
                              alt="paciente da fila"
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </>
            )}

            {queueListWithScheduled && (
              <>
                <h3 className="home__text">Atendimento na fila agendado</h3>
                <div className="home__pacientsQueueList">
                  <ul className="home__pacientsQueueList__container">
                    {queueListWithScheduled &&
                      queueListWithScheduled.map((queue) => {
                        return (
                          <li
                            key={queue.userId}
                            className="home__pacientsQueueList__item"
                            onClick={() => goToChat(userData.id, queue.userId)}
                          >
                            <Image
                              src={queue.userphoto ?? person}
                              width={75}
                              height={75}
                              alt="paciente da fila"
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </>
            )}

            <div className="home__professionalCards">
              <Link href="/schedules-attendant/waiting">
                <div
                  className="home__professionalCards__card"
                  style={{ backgroundImage: `url(${schedulesBanner.src})` }}
                >
                  <p>Agendamentos</p>
                  <small>9 disponíveis</small>
                </div>
              </Link>
              <Link href="/schedules-attendant/scheduled">
                <div
                  className="home__professionalCards__card"
                  style={{ backgroundImage: `url(${scheduledBanner.src})` }}
                >
                  <p>Agendados</p>
                  <small>15 disponíveis</small>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
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
                      <p className="home__cards__card__title">
                        {category.name}
                      </p>
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
          </>
        )}
      </div>
    );
};

export default Page;
