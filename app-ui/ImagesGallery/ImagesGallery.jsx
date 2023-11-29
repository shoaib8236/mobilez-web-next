import React from 'react'
import ImageGallery from "react-image-gallery";

const ImagesGallery = (props) => {
  const {images} = props
    
  return (
    <>
            <ImageGallery items={images}/>;
    </>
  )
}

export default ImagesGallery;