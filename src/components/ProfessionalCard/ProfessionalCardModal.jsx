import React, { useState } from "react";
import Modal from "react-modal";
import { FaSadTear } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "@/styles/ProfessionalCard/ProfessionalCardModal.scss";

Modal.setAppElement("body");

const ProfessionalCardModal = ({ openModal, onClose }) => {
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={onClose}
      contentLabel="Exemplo de Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="professionalCardModal">
        <div className="professionalCardModal__icon">
          <FaSadTear />
        </div>
        <h1 className="professionalCardModal__title">Atendente indisponível</h1>
        <p className="professionalCardModal__text">
          Este atendente não está disponível no momento.
        </p>
        <button onClick={onClose} className="professionalCardModal__close">
          <AiOutlineCloseCircle />
        </button>
      </div>
    </Modal>
  );
};

export default ProfessionalCardModal;
