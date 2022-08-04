import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery'
import Loader from './Loader/Loader'
import Button from './Button/Button';
import Modal from './Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css' 

const KEY = "27771595-431aa52f6f585107eea577c49";
const itemsPerPage = 12;
const Status = {
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
  SUCCESS: "success"
}

const App = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [selectedImageId, setSelectedImageId] = useState("");

  const fetchImages = async (search, page = 1) => {
    const result = await axios.get(
      `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
    )
    return result.data.hits;
  };

  const handleFormSubmit = async (search) => {
    if (search === searchQuery) {
      toast.info("this request has already been processed. Please enter new request!");
      return
    }
      try {
        setStatus(Status.LOADING)
        const images = await fetchImages(search);
        setSearchQuery(search);
        setImages(images);
        setStatus(Status.SUCCESS);
      } catch (error) {
        toast.error(error);
        setStatus(Status.ERROR)
      }
};

  const loadMore = async () => {
    try {
        setStatus(Status.LOADING)
        const newImages = await fetchImages(searchQuery, page + 1);
        setImages([...images, ...newImages]);
        setStatus(Status.SUCCESS);
      } catch (error) {
        toast.error(error);
        setStatus(Status.ERROR)
      }
    setPage(page + 1);
  };

  
  const toggleModal = (imageId) => {
    setSelectedImageId(imageId || "");
  }

  const hasImages = !!images.length;
  const selectedImage = images.find((image) => { return image.id === selectedImageId });
  return (
    <div className="App">
      { selectedImage && <Modal onClose={toggleModal} image={selectedImage} />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageItemClick={toggleModal} />
      {!hasImages && "Enter search word"}
      {hasImages && status === Status.SUCCESS && <Button onClick={loadMore} />}
      {status === Status.LOADING && <Loader />}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;