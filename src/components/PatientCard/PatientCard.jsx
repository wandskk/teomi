import React from "react";
import Image from "next/image";
import Link from "next/link";
import person from "@/assets/images/icons/person.png";
import { validateGoogleMeetLink } from "@/resources/helpers/googleMeet/validateGoogleMeetLink";
import { CiCalendar } from "react-icons/ci";
import { IoMdVideocam } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import "@/styles/PatientCard/PatientCard.scss";

const PatientCard = ({
  patientData,
  type,
  onClick,
  handleUpdateMeetLink = null,
}) => {
  const [patientMeetLink, setPatientMeetLink] = React.useState(null);
  const [editMeetLink, setEditMeetLink] = React.useState(false);
  const [patientMeetLinkError, setPatientMeetLinkError] = React.useState("");
  const patientAddressSchedule = patientData.locationInfo[0] ?? null;
  const patientPhoto =
    patientData.patientPhoto != "null" ? patientData.patientPhoto : person;

  const handleEditMeetLink = () => setEditMeetLink(!editMeetLink);

  function handleValidateMeetLink() {
    const validateMeetLink = validateGoogleMeetLink(patientMeetLink);

    if (validateMeetLink) {
      handleEditMeetLink();
      handleUpdateMeetLink(patientData.scheduleId, patientMeetLink);
      setPatientMeetLinkError("");
    } else {
      setPatientMeetLinkError("Insira um link válido");
    }
  }

  React.useEffect(() => {
    if (patientData.scheduleMeetUrl)
      setPatientMeetLink(patientData.scheduleMeetUrl);
  }, [patientData]);

  return (
    <div className="patientCard">
      <div className="patientCard__content">
        <div className="patientCard__image">
          <Image
            src={patientPhoto}
            alt="perfil do paciente"
            width={64}
            height={64}
          />
        </div>
        <div className="patientCard__text">
          <p className="patientCard__text__name">
            <strong>{patientData.patientName}</strong>
          </p>
          {type === "waiting" && (
            <>
              <small className="patientCard__text__profession">
                {patientData.scheduleDate}
              </small>
              <small className="patientCard__text__profession">
                {patientData.scheduleStartTime}
              </small>
            </>
          )}
        </div>
        {type === "waiting" && (
          <button
            className="patientCard__button"
            onClick={() => onClick(patientData.scheduleId)}
          >
            Aceitar
          </button>
        )}
        {type === "scheduled" && (
          <button className="patientCard__button">
            <CiCalendar />
            <div>
              <small className="patientCard__text__profession">
                {patientData.scheduleDate}
              </small>
              <small className="patientCard__text__profession">
                {patientData.scheduleStartTime}
              </small>
            </div>
          </button>
        )}
      </div>

      {type === "scheduled" && patientAddressSchedule && (
        <div className="patientCard__footer">
          <ul className="patientCard__footer__list">
            <li className="patientCard__footer__list__item">
              <FaRegBuilding />
              <p>
                {`${patientAddressSchedule.locationName} - ${patientAddressSchedule.locationAddress} / ${patientAddressSchedule.locationNumber}`}
              </p>
            </li>
            <li className="patientCard__footer__list__item">
              <SlLocationPin />
              <p>
                {`${patientAddressSchedule.locationCity} / ${patientAddressSchedule.locationState}`}
              </p>
            </li>
          </ul>
        </div>
      )}

      {type === "scheduled" && patientData.scheduleIsOnline === 1 && (
        <div className="patientCard__footer">
          <div className="patientCard__footer__actions">
            <button
              onClick={handleEditMeetLink}
              className="patientCard__footer__actions__edit"
            >
              {editMeetLink
                ? "Cancelar"
                : patientData.scheduleMeetUrl
                ? "Editar link"
                : "Adicionar link"}
            </button>

            {patientData.scheduleMeetUrl && (
              <Link
                className="patientCard__footer__actions__enter"
                target="_blank"
                href={patientData.scheduleMeetUrl}
              >
                <IoMdVideocam />
                Entrar
              </Link>
            )}
          </div>

          {editMeetLink && (
            <div className="patientCard__footer__form">
              <input
                type="text"
                className={`patientCard__footer__form__input ${
                  patientMeetLinkError.length > 0 && "--error"
                }`}
                placeholder="Cole aqui o link do GoogleMeet"
                value={patientMeetLink}
                onChange={({ target }) => setPatientMeetLink(target.value)}
              />

              <button
                className="patientCard__footer__form__submit"
                onClick={handleValidateMeetLink}
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientCard;
