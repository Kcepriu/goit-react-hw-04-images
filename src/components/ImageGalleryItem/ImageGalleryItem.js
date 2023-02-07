import PropTypes from 'prop-types';

import { ItemGallery, ImgGallery } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <ItemGallery className="gallery-item">
      <ImgGallery
        src={webformatURL}
        alt={tags}
        data-large-img={largeImageURL}
      />
    </ItemGallery>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
