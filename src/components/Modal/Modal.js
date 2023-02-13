import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalInfo, handlerOnCloseModal }) => {
  const { src, alt } = modalInfo;

  const handlerOnClickModal = useCallback(
    event => {
      // * Close modal
      if (event.currentTarget === event.target) handlerOnCloseModal();
    },
    [handlerOnCloseModal]
  );

  const handlerKeyDownESC = useCallback(
    event => {
      // key press esc Close modal
      if (event.key === 'Escape') handlerOnCloseModal();
    },
    [handlerOnCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handlerKeyDownESC);

    return () => {
      window.removeEventListener('keydown', handlerKeyDownESC);
    };
  }, [handlerKeyDownESC]);

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
