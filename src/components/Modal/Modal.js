import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalInfo, handlerOnCloseModal }) => {
  const { src, alt } = modalInfo;

  const handlerOnClickModal = event => {
    // * Close modal
    if (event.currentTarget === event.target) handlerOnCloseModal();
  };
  const handlerKeyDownESC = event => {
    // key press esc Close modal
    if (event.key === 'Escape') handlerOnCloseModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handlerKeyDownESC);

    return () => {
      document.removeEventListener('keydown', handlerKeyDownESC);
    };
  }, []);

  return createPortal(
    <Overlay className="overlay" onClick={handlerOnClickModal}>
      <ModalWindow className="modal">
        <img src={src} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  modalInfo: PropTypes.exact({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};

export default Modal;
