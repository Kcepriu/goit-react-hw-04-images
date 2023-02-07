import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import ButtonLoadMore from './Button/Button';
import Loader from './Loader';
import getImage from '../services/fetchImage';

import { Container } from './App.styled';

class App extends Component {
  state = {
    filter: '',
    currentNumberPage: 1,
    gallery: [],
    modalInfo: null,
    status: '',
  };

  async componentDidUpdate(_, prevState) {
    const { filter, currentNumberPage } = this.state;

    if (filter !== prevState.filter) {
      console.log('componentDidUpdate', filter);
      // Новий запит треба
      // Очистити галерею
      // фетчити нові дані
      const itemsGallary = await getImage(filter, currentNumberPage);

      console.log(itemsGallary);

      this.setState({
        currentNumberPage: 1,
        gallery: itemsGallary,
      });
    }

    if (currentNumberPage !== prevState.currentNumberPage) {
      console.log('componentDidUpdate', currentNumberPage);
      // Запит нової сторінки
      // фетчити нові дані
      // const itemsGallary = await getImage(filter, numberPage);
      // console.log(itemsGallary);
    }
  }

  // * Handlers
  handlerOnSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    this.setState({
      filter: form.elements.filter.value,
    });
    // form.reset();
  };

  handlerOnClickImg = event => {
    if (event.currentTarget === event.target) return;

    this.setState({
      modalInfo: {
        src: event.target.dataset.largeImg,
        alt: event.target.alt,
      },
    });
  };

  handrerClickLoadMore = event => {
    console.log('handrerClickLoadMore');
  };

  handlerOnClickModal = event => {
    //Close modal
    if (event.currentTarget !== event.target) return;
    this.setState({ modalInfo: null });
  };

  render() {
    const { gallery, modalInfo, status } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handlerOnSubmit} />

        <ImageGallery
          itemsGallery={gallery}
          handlerOnClick={this.handlerOnClickImg}
        />

        {modalInfo !== null && (
          <Modal
            modalInfo={modalInfo}
            handlerOnClick={this.handlerOnClickModal}
          />
        )}

        {status === 'ShowLoad' && <Loader />}

        <ButtonLoadMore
          textButton="Load more"
          handlerOnClick={this.handrerClickLoadMore}
        />
      </Container>
    );
  }
}

export default App;
