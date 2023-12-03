import React from "react";
import { BsCheck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import "@/styles/Message/Message.scss";

const Message = ({ message, type, resetMessage }) => {
  const [showMessage, setShowMessage] = React.useState(true);

  const handleShowMessage = () => setTimeout(() => handleHideMessage(), 120000);

  const handleHideMessage = () => setShowMessage(false);

  React.useEffect(() => {
    if (message) {
      setShowMessage(true);
      handleShowMessage();
    } else {
      resetMessage(null);
      setShowMessage(false);
    }
  }, [message]);

  return (
    <CSSTransition
      in={showMessage}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className={`message ${type} ${showMessage && "show"} fade-content`}>
        <div className={`message__icon ${type}`}>
          {type === "success" && <BsCheck />}
          {type === "error" && <AiOutlineClose />}
        </div>
        <div className={`message__text ${type}`}>
          <h2>
            {(type === "success" && "Sucesso") || (type === "error" && "Error")}
          </h2>
          <small>{message}</small>
        </div>
        <button className={`message__exit ${type}`} onClick={handleHideMessage}>
          <AiOutlineClose />
        </button>
      </div>
    </CSSTransition>
  );
};

export default Message;
