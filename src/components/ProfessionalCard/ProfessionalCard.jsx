import React from "react";
import Image from "next/image";
import ProfessionalCardModal from "@/components/ProfessionalCard/ProfessionalCardModal";
import { BsChatDots } from "react-icons/bs";
import { SystemServices } from "@/services/modules/system";
import { UserContext } from "@/context/UserContext";
import "@/styles/ProfessionalCard/ProfessionalCard.scss";

const ProfessionalCard = ({ data }) => {
  const [isAvailable, setIsAvailable] = React.useState(data.isAvailable);
  const [openModal, setOpenModal] = React.useState(false);
  const { connectID } = React.useContext(UserContext);

  const handleCloseModal = () => setOpenModal(false);

  async function canGoQueue(attendantId, token) {
    try {
      const professionalStatus = await SystemServices.verifyProfessionalStatus(
        attendantId,
        token
      );
      window.location.href = `/queue/${attendantId}`;
    } catch (error) {
      setOpenModal(true);
      setIsAvailable(0);
    }
  }

  return (
    <div className={`professionalCard ${isAvailable === 0 && "--offiline"}`}>
      {openModal && (
        <ProfessionalCardModal
          openModal={openModal}
          onClose={handleCloseModal}
        />
      )}
      <div className="professionalCard__content">
        <div
          className={`professionalCard__image ${
            isAvailable === 1 && "--online"
          }`}
        >
          <Image
            src={data.attendantPhoto}
            alt="perfil do profissional"
            width={64}
            height={64}
          />
        </div>
        <div className="professionalCard__text">
          <p className="professionalCard__text__name">
            <strong>{data.attendantName}</strong>
          </p>
          <small className="professionalCard__text__profession">
            {data.attendantRole}
          </small>
        </div>
      </div>
      <button
        className={`professionalCard__button ${
          isAvailable === 0 && "--offiline"
        }`}
        onClick={() => canGoQueue(data.attendant_id, connectID)}
      >
        <BsChatDots />
        {isAvailable === 0 ? "Offiline" : "Iniciar chat"}
      </button>
    </div>
  );
};

export default ProfessionalCard;
