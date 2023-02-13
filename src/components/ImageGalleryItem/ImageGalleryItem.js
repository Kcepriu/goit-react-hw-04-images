import { useState } from 'react';
import Modal from 'components/Modal';

import PropTypes from 'prop-types';

import { ItemGallery, ImgGallery } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [modalInfo, setModalInfo] = useState(null);

  const handlerOnClickImg = event => {
    // * Open Modal
    // if (event.currentTarget === event.target) return;

    setModalInfo({
      src: event.target.dataset.largeImg,
      alt: event.target.alt,
    });
  };

  const onCloseModal = () => {
    setModalInfo(null);
  };

  return (
    <>
      <ItemGallery className="gallery-item" onClick={handlerOnClickImg}>
        <ImgGallery
          src={webformatURL}
          alt={tags}
          data-large-img={largeImageURL}
        />
      </ItemGallery>

      {modalInfo !== null && (
        <Modal modalInfo={modalInfo} handlerOnCloseModal={onCloseModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

//handlerOnClick: PropTypes.func,

export default ImageGalleryItem;
