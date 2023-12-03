import React from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UserContext } from "@/context/UserContext";
import { SchedulesServices } from "@/services/modules/schedules";
import { AttendantServices } from "@/services/modules/attendant";
import "@/styles/AttendantLocations/AttendantLocationsAddModal.scss";

Modal.setAppElement("body");

const AttendantLocationsAddModal = ({
  openModal,
  onClose,
  updateAttendantLocationsList,
}) => {
  const [locationName, setLocationName] = React.useState("");
  const [locations, setLocations] = React.useState(null);
  const { userDataDecode, connectID, setLoading } =
    React.useContext(UserContext);

  const handleCloseModal = () => {
    setLocationName("");
    setLocations(null);
    onClose();
  };

  const handleAddAttendantLocation = async (locationId) => {
    const { userId } = userDataDecode;
    setLoading(true);

    try {
      await AttendantServices.addAttendantLocation(
        userId,
        locationId,
        connectID
      );
    } catch (error) {
      console.log(error);
    } finally {
      await updateAttendantLocationsList(userId);
      onClose();
      setLocationName("");
      setLocations(null);
      setLoading(false);
    }
  };

  async function getLocationsByName(locationName) {
    try {
      const locations = await SchedulesServices.getLocationsByName(
        locationName,
        connectID
      );
      setLocations(locations);
    } catch (error) {}
  }

  React.useEffect(() => {
    if (locationName.length >= 3) getLocationsByName(locationName);
    else setLocations(null);
  }, [locationName]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={handleCloseModal}
      contentLabel="Exemplo de Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="attendantLocationsAddModal">
        <button
          onClick={handleCloseModal}
          className="attendantLocationsAddModal__close"
        >
          <AiOutlineCloseCircle />
        </button>

        <h1 className="attendantLocationsAddModal__title">
          Adicione um novo local
        </h1>

        <div className="attendantLocationsAddModal__content">
          <input
            className="attendantLocationsAddModal__input"
            type="text"
            placeholder="Digite o nome da unidade"
            value={locationName}
            onChange={({ target }) => setLocationName(target.value)}
          />
          {locations && (
            <ul className="attendantLocationsAddModal__list">
              {locations &&
                locations.map((location, index) => (
                  <li
                    key={index}
                    className="attendantLocationsAddModal__location"
                    onClick={() =>
                      handleAddAttendantLocation(location.locationId)
                    }
                  >
                    <p className="attendantLocationsAddModal__location__name">
                      {location.locationName}
                    </p>
                    <p className="attendantLocationsAddModal__location__address">
                      {`${location.locationAddress}, ${location.locationNumber}`}
                    </p>
                    <p className="attendantLocationsAddModal__location__city">
                      {`${location.locationCityName}/${location.locationStateName}`}
                    </p>
                    <p className="attendantLocationsAddModal__location__neighborhood">
                      {`${location.locationNeighborhood}, ${location.locationPostalCode}`}
                    </p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AttendantLocationsAddModal;
