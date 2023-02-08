import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import ButtonLoadMore from './Button/Button';
import Loader from './Loader';
import NoFind from './NoFind/NoFind';
import getImage from '../services/fetchImage';

import { Container } from './App.styled';

//poland car
//Could not find the image
class App extends Component {
  state = {
    filter: '',
    currentNumberPage: 1,
    gallery: [],
    modalInfo: null,
    showLoad: '',
    showLoadMore: false,
  };

  async fetchImage() {
    const { filter, currentNumberPage } = this.state;

    this.setState({
      showLoad: true,
    });

    try {
      const { itemsGallary, noMore } = await getImage(
        filter,
        currentNumberPage
      );

      this.setState(prevState => {
        return {
          gallery: [...prevState.gallery, ...itemsGallary],
          showLoadMore: noMore,
        };
      });
    } catch {
      console.log('Error fetch');
    } finally {
      this.setState({
        showLoad: false,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { filter, currentNumberPage, modalInfo } = this.state;

    if (
      filter !== prevState.filter ||
      currentNumberPage !== prevState.currentNumberPage
    ) {
      this.fetchImage();
    }

    if (!modalInfo && modalInfo !== prevState.modalInfo) {
      //Відключити слухач esc
      document.removeEventListener('keydown', this.handlerKeyDownESC);
    }
  }

  // * Handlers
  handlerOnSubmit = event => {
    // * Submit form
    event.preventDefault();
    const form = event.currentTarget;
    this.setState({
      filter: form.elements.filter.value,
      currentNumberPage: 1,
      gallery: [],
      showLoadMore: false,
    });
    // form.reset();
  };

  handrerClickLoadMore = event => {
    // * Load more
    this.setState(prevState => {
      return { currentNumberPage: prevState.currentNumberPage + 1 };
    });
  };

  handlerOnClickImg = event => {
    // * Open Modal
    if (event.currentTarget === event.target) return;

    document.addEventListener('keydown', this.handlerKeyDownESC);
    this.setState({
      modalInfo: {
        src: event.target.dataset.largeImg,
        alt: event.target.alt,
      },
    });
  };

  handlerOnClickModal = event => {
    // * Close modal
    if (event.currentTarget !== event.target) return;
    this.setState({ modalInfo: null });
  };

  handlerKeyDownESC = event => {
    // key press esc Close modal
    if (event.key !== 'Escape') return;
    this.setState({ modalInfo: null });
  };

  render() {
    const { filter, gallery, modalInfo, showLoad, showLoadMore } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handlerOnSubmit} />
        {gallery.length > 0 && (
          <ImageGallery
            itemsGallery={gallery}
            handlerOnClick={this.handlerOnClickImg}
          />
        )}

        {gallery.length === 0 && filter !== '' && !showLoad && <NoFind />}
        {modalInfo !== null && (
          <Modal
            modalInfo={modalInfo}
            handlerOnClick={this.handlerOnClickModal}
          />
        )}
        {showLoad && <Loader />}
        {gallery.length > 0 && showLoadMore && (
          <ButtonLoadMore
            textButton="Load more"
            handlerOnClick={this.handrerClickLoadMore}
          />
        )}
      </Container>
    );
  }
}

export default App;
