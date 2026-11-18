import { useEffect } from "react";
import closeIcon from "../../assets/icon-close.svg"
import "./Modal.css"

function Modal({children, title, onClose, titleWhite}) {
    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Bloquea el scroll de fondo

    // Limpieza al desmontar el modal
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Restaura el scroll
    };
  }, [onClose]);

    return ( 
        <div className="modal">
            <div className={titleWhite ? "modal__container-black" : "modal__container"}>
                <button 
                    className={titleWhite ? "modal__button-close-container-black" : "modal__button-close"}
                    type="button"
                    onClick={onClose}                    
                >
                    <img className="modal__button__icon-close" src={closeIcon}/>
                </button>
                <h4 className={titleWhite ? "modal__title-white" : "modal__title"}>{title}</h4>
                {children}
            </div>
            
        </div>
     );
}

export { Modal };