import React from "react";
import ImageGallery from "react-image-gallery";

const ImagesGallery = (props) => {
  const { images } = props;

  return (
    <>
      <div className="styled_gallery">
        <ImageGallery items={images} />
      </div>
    </>
  );
};

export default ImagesGallery;
