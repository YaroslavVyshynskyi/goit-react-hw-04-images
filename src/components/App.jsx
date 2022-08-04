import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery'
import Loader from './Loader/Loader'
import Button from './Button/Button';
import Modal from './Modal/Modal';
import './styles.css' 

const KEY = "27771595-431aa52f6f585107eea577c49";
const Status = {
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
  SUCCESS: "success"
}

class App extends Component {
  state = {
    searchQuery: "",
    images: [],
    page: 1,
    perPage: 12,
    status: Status.IDLE,
    showModal: false,
    selectedImageId: "",
  };

  componentDidMount() { 
    this.fetchImages();
  };

  componentDidUpdate(prevProps, prevState) { 
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  };

  fetchImages = async () => {
    if (!this.state.searchQuery) {
      return
    }

    try {
      this.setState({ status: Status.LOADING });
      const result = await axios.get(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
      this.setState({ images: [...this.state.images, ...result.data.hits], status: Status.SUCCESS });
    
    } catch (error) {
      console.error(error);
      this.setState({ status: Status.ERROR });
    }
  };

  handleFormSubmit = search => {
    if (search === this.state.searchQuery) { 
      alert("this request has already been processed. Please enter new request")
      return
    }
    this.setState({ searchQuery: search, images: [] });
  };

  changePage = () => {
    this.setState({ page: this.state.page + 1 })
  };

  
  toggleModal = (imageId) => { 
    this.setState(({showModal}) => ({
      showModal: !showModal,
      selectedImageId: imageId || "",
    }))
  }

  render() {
    const { images, status, showModal, selectedImageId }  = this.state;
    const hasImages = !!images.length;
    const selectedImage = images.find((image) => { return image.id === selectedImageId });
    return (
      <div className="App">
        {showModal && selectedImage && <Modal onClose={this.toggleModal} image={ selectedImage } /> }
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} onImageItemClick={this.toggleModal} />
        {!hasImages && "Enter search word"}
        {hasImages && status === Status.SUCCESS && <Button onClick={this.changePage}/>}
        {status === Status.LOADING && <Loader/>}
      </div>
    );
  };
};

export default App;

