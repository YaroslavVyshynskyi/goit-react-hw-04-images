import React, { useState, useEffect } from 'react';
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
  const [totalImages, setTotalImages] = useState(0);

  const fetchImages = async (search, page = 1) => {
    const result = await axios.get(
      `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
    )
    return { images: result.data.hits, totalImages: result.data.totalHits };
  };
  
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const saveImages = async () => {
      try {
        setStatus(Status.LOADING)
        const { images: newImages, totalImages: fetchTotalImages } = await fetchImages(searchQuery, page);
        setImages((oldImages) => [...oldImages, ...newImages]);
        setStatus(Status.SUCCESS);
        setTotalImages(fetchTotalImages);
      } catch (error) {
        toast.error(error);
        setStatus(Status.ERROR)
      }
    }
    saveImages();
  }, [page, searchQuery]);


  const handleFormSubmit = search => { 
    if (search === searchQuery) {
      toast.info("this request has already been processed. Please enter new request");
      return;
    }
    setSearchQuery(search);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  }

  const loadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = (imageId) => {
    setSelectedImageId(imageId || "");
  }

  const hasImages = !!images.length;
  const hasMoreImages = images.length < totalImages;
  const selectedImage = images.find((image) => { return image.id === selectedImageId });
  return (
    <div className="App">
      { selectedImage && <Modal onClose={toggleModal} image={selectedImage} />}
      <Searchbar onSubmit={handleFormSubmit} searchQuery={ searchQuery } />
      <ImageGallery images={images} onImageItemClick={toggleModal} />
      {!hasImages && "Enter search word"}
      {hasImages && hasMoreImages && status === Status.SUCCESS && <Button onClick={loadMore} />}
      {status === Status.LOADING && <Loader />}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;