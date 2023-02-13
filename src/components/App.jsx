import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ButtonLoadMore from './Button/Button';
import Loader from './Loader';
import NoFind from './NoFind';
import getImage from '../services/fetchImage';

import { Container } from './App.styled';

const App = () => {
  const [filter, setFilter] = useState('');
  const [currentNumberPage, setCurrentNumberPage] = useState(1);
  const [gallery, setGallery] = useState([]);

  const [showLoad, setShowLoad] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(
    prevState => {
      const fetchImage = async () => {
        setShowLoad(true);

        try {
          const { itemsGallary, noMore } = await getImage(
            filter,
            currentNumberPage
          );

          setGallery(prevState => [...prevState, ...itemsGallary]);
          setShowLoadMore(noMore);
        } catch {
          console.log('Error fetch');
        } finally {
          setShowLoad(false);
        }
      };

      fetchImage();
    },
    [filter, currentNumberPage]
  );

  // * Handlers
  const handlerOnSubmit = event => {
    // * Submit form
    event.preventDefault();
    const form = event.currentTarget;
    const newFilter = form.elements.filter.value;

    if (newFilter === filter) return;

    setFilter(form.elements.filter.value);
    setCurrentNumberPage(1);
    setGallery([]);
    setShowLoadMore(false);
  };

  const handrerClickLoadMore = event => {
    // * Load more
    setCurrentNumberPage(state => state + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handlerOnSubmit} />
      {gallery.length > 0 && <ImageGallery itemsGallery={gallery} />}

      {gallery.length === 0 && filter !== '' && !showLoad && <NoFind />}

      {showLoad && <Loader />}

      {gallery.length > 0 && showLoadMore && (
        <ButtonLoadMore
          textButton="Load more"
          handlerOnClick={handrerClickLoadMore}
        />
      )}
    </Container>
  );
};

export default App;
