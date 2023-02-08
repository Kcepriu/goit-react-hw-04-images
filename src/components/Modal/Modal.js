import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ modalInfo, handlerOnClick }) => {
  return (
    <Overlay className="overlay" onClick={handlerOnClick}>
      <ModalWindow className="modal">
        <img src={modalInfo.src} alt={modalInfo.alt} />
      </ModalWindow>
    </Overlay>
  );
};

//src, alt
Modal.propTypes = {
  modalInfo: PropTypes.exact({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),

  handlerOnClick: PropTypes.func,
};

export default Modal;
