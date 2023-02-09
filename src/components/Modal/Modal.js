import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    modalInfo: PropTypes.exact({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),

    handlerOnCloseModal: PropTypes.func,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlerKeyDownESC);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlerKeyDownESC);
  }

  handlerOnClickModal = event => {
    // * Close modal
    if (event.currentTarget !== event.target) return;
    this.props.handlerOnCloseModal();
  };

  handlerKeyDownESC = event => {
    // key press esc Close modal
    if (event.key !== 'Escape') return;
    this.props.handlerOnCloseModal();
  };

  render() {
    const { src, alt } = this.props.modalInfo;
    return createPortal(
      <Overlay className="overlay" onClick={this.handlerOnClickModal}>
        <ModalWindow className="modal">
          <img src={src} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
