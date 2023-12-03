"use client";

import React from "react";
import Link from "next/link";
import AttendantLocationsAddModal from "@/components/AttendantLocations/AttendantLocationsAddModal";
import { FaExternalLinkAlt } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import { AttendantServices } from "@/services/modules/attendant";
import { MdDelete } from "react-icons/md";
import "./page.scss";

const Page = () => {
  const [attedantLocations, setAttendantLocations] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const { userDataDecode, connectID, setLoading } =
    React.useContext(UserContext);

  const getAttendantLocations = React.useCallback(async (attentandId) => {
    setLoading(true);
    try {
      const locatations = await AttendantServices.getAttendantLocationsById(
        attentandId,
        connectID
      );
      setAttendantLocations(locatations);
    } catch (error) {
      setAttendantLocations(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteAttendantLocation = async (locationId) => {
    const { userId } = userDataDecode;
    try {
      await AttendantServices.removeAttendantLocation(
        userId,
        locationId,
        connectID
      );
      await getAttendantLocations(userId);
    } catch (error) {}
  };

  const handleShowModal = () => setShowModal(!showModal);

  React.useEffect(() => {
    getAttendantLocations(userDataDecode.userId);
  }, [getAttendantLocations]);

  return (
    <>
      <section className="attendantLocations">
        <header className="attendantLocations__header">
          <div className="attendantLocations__header__navigation">
            <Link
              className="attendantLocations__header__navigation__link"
              href="/attendant-agenda/inPerson"
            >
              <FaExternalLinkAlt />
              Acessar agenda presencial
            </Link>
          </div>
          <h2 className="attendantLocations__header__title">
            Meus locais de trabalho
          </h2>
          <p className="attendantLocations__header__subtitle">
            Estes são seus locais de trabalho, gerencie os seus locais aqui.
          </p>
          {}
          <button
            className="attendantLocations__header__modalButton"
            onClick={handleShowModal}
          >
            Adicionar novo local
          </button>
        </header>

        <ul className="attendantLocations__list">
          {attedantLocations &&
            attedantLocations.map(
              ({
                locationId,
                locationName,
                locationAddress,
                locationNumber,
                locationCityName,
                locationStateName,
                locationNeighborhood,
                locationPostalCode,
                locationImage,
              }) => (
                <li
                  key={locationId}
                  className="attendantLocations__card"
                  style={{ backgroundImage: `url(${locationImage})` }}
                >
                  <div className="attendantLocations__card__content">
                    <p className="attendantLocations__card__name">
                      {locationName}
                    </p>

                    <div className="attendantLocations__card__address">
                      <p>{`${locationAddress}, ${locationNumber}`}</p>
                      <p>{`${locationCityName}/${locationStateName}`}</p>
                      <p>{`${locationNeighborhood}, ${locationPostalCode}`}</p>
                    </div>
                  </div>
                  <button
                    className="attendantLocations__card__delete"
                    onClick={() => handleDeleteAttendantLocation(locationId)}
                  >
                    <MdDelete />
                  </button>
                </li>
              )
            )}
        </ul>
        {!attedantLocations && (
            <p>Você não possui locais de trabalho no momento, adicione o seu local no botão acima</p>
        )}
      </section>
      <AttendantLocationsAddModal
        openModal={showModal}
        onClose={handleShowModal}
        updateAttendantLocationsList={getAttendantLocations}
      />
    </>
  );
};

export default Page;
