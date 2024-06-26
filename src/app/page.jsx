"use client";

import React from "react";
import Image from "next/image";
import flower from "@/assets/images/flower.png";
import homeBanner from "@/assets/images/homeBanner.svg";
import homeBallon from "@/assets/images/homeBallon.svg";
import teomi from "@/assets/images/teomi.png";
import person from "@/assets/images/icons/person.png";
import schedulesBanner from "@/assets/images/schedulesBanner.png";
import scheduledBanner from "@/assets/images/scheduledBanner.png";
import Message from "@/components/Message/Message";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { name } from "@/resources/helpers/name/name";
import { ChatServices } from "@/services/modules/chat";
import { AttendantServices } from "@/services/modules/attendant";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { getCookie } from "@/resources/helpers/cookies/getCookie";
import { usePathname } from "next/navigation";
import "./page.scss";

const SOCKET_API_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL;

const Page = () => {
  const { userDataDecode, userData, loading, setLoading, connectID } =
    React.useContext(UserContext);
  const [professionalStatus, setProfessionalStatus] = React.useState(null);
  const [schedulesAttendant, setSchedulesAttendant] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [queueList, setQueueList] = React.useState(null);
  const pathname = usePathname();
  const isProfessionalOrAttedant =
    userDataDecode &&
    (userDataDecode.userType === 2 || userDataDecode.userType === 3);
  const searchParams = useSearchParams();
  const search = searchParams.get("queueEnd");

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

  async function getHomeDataAttendantSchedules(attendantId, token) {
    try {
      const schedules = await AttendantServices.getQtdHomeAttendantSchedules(
        attendantId,
        token
      );
      setSchedulesAttendant(schedules);
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

  async function getRandomAttendantChat() {
    setLoading(true);
    const patientId = userDataDecode ? userDataDecode.userId : connectID;
    try {
      const randomAttendantId = await ChatServices.getRandomAttendantChat(
        patientId,
        connectID
      );
      window.location.href = `/general-queue/`;
    } catch (error) {
      const { status } = error.response;

      if (status === 400) {
        const { chatData } = error.response.data;
        window.location.href = `/general-queue/`;
      } else {
        setMessage({
          text: "Não há atendentes disponíveis no momento, tente novamente mais tarde!",
          type: "error",
        });
        setLoading(false);
      }
    }
  }

  async function getAttendantStatus() {
    try {
      const attendantId = userDataDecode.userId;
      const attendantStatus = await AttendantServices.getAttendantStatus(
        attendantId,
        connectID
      );
      if (attendantStatus.isAvailable === 1) setProfessionalStatus(true);
      else setProfessionalStatus(false);
    } catch (error) {}
  }

  async function handleChangeAttendantStatus() {
    try {
      const attendantId = userDataDecode.userId;
      const status = professionalStatus === true ? 1 : 0;
      const changeAttendantStatus =
        await AttendantServices.changeAttendantStatus(
          attendantId,
          status,
          connectID
        );
    } catch (error) {}
  }

  React.useEffect(() => {
    const socket = io(SOCKET_API_URL);

    // Sockets para professionais ou atendentes
    if (userDataDecode && isProfessionalOrAttedant) {
      socket.on("chatReadyAttendant", (data) => {
        if (data.attendantId == userDataDecode.userId) {
          window.location.href = `/chat-attendant/${data.chatId}/${data.patientId}`;
        }
      });

      socket.on("attendantQueue", (data) => {
        setQueueList(null);
        data.map((attendant) => {
          if (attendant.attendantId === userDataDecode.userId) {
            setQueueList(attendant.users);
          }
        });
      });
    }

    // Sockets para pacientes logados ou deslogados
    if (!isProfessionalOrAttedant) {
      socket.on("categoriesWithAttendantsAvailable", (data) => {
        setCategories(data);
      });
    }

    return () => socket.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isProfessionalOrAttedant) getCategories(connectID);
  }, [isProfessionalOrAttedant, getCategories]);

  React.useEffect(() => {
    if (isProfessionalOrAttedant) {
      getQueueList(userDataDecode.userId, connectID);
    }
  }, [pathname, isProfessionalOrAttedant]);

  React.useEffect(() => {
    if (isProfessionalOrAttedant) {
      getHomeDataAttendantSchedules(userDataDecode.userId, connectID);
    }
  }, [userDataDecode]);

  React.useEffect(() => {
    if (professionalStatus !== null) handleChangeAttendantStatus();
  }, [professionalStatus]);

  React.useEffect(() => {
    if (isProfessionalOrAttedant) {
      getAttendantStatus();
    }
  }, [userDataDecode]);

  React.useEffect(() => {
    if (search === "true") {
      setMessage({
        text: "O tempo na fila de espera esgotou, tente novamente mais tarde!",
        type: "error",
      });
    }
  }, [search]);

  if (userData != null && !loading)
    return (
      <div className="home">
        {message && (
          <Message
            message={message?.text}
            type={message?.type}
            resetMessage={setMessage}
          />
        )}

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
              <div className="home__header__status">
                <p>{professionalStatus ? "Online" : "Offline"}</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={professionalStatus}
                    onChange={() => setProfessionalStatus(!professionalStatus)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
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
              <div
                className="home__header__banner"
                onClick={getRandomAttendantChat}
              >
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
                            <div
                              className="home__pacientsQueueList__item__photo"
                              style={{
                                backgroundImage: `url(${
                                  queue.userphoto ?? person.src
                                })`,
                              }}
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
                  <small>
                    {schedulesAttendant?.waitingConfirmationCount > 0
                      ? `${schedulesAttendant.waitingConfirmationCount} disponíveis`
                      : "Nenhum disponível"}
                  </small>
                </div>
              </Link>
              <Link href="/schedules-attendant/scheduled">
                <div
                  className="home__professionalCards__card"
                  style={{ backgroundImage: `url(${scheduledBanner.src})` }}
                >
                  <p>Agendados</p>
                  <small>
                    {schedulesAttendant?.confirmedCount > 0
                      ? `${schedulesAttendant.confirmedCount} disponíveis`
                      : "Nenhum disponível"}
                  </small>
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
