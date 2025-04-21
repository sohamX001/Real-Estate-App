import React, { useState } from "react";
import "./slider.scss";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function Slider({ images }) {
  const [imgIndex, setImgIndex] = useState(null);

  return (
    <div className="slider">
      {imgIndex !== null && (
        <div className="fullSlider">
          <ChevronLeft className="arrow" onClick={() => {imgIndex > 0 ? setImgIndex(imgIndex - 1):setImgIndex(3)}} />
          <div className="imgContainer">
            <img src={images[imgIndex]} alt="Room image" />
          </div>
          <ChevronRight className="arrow" onClick={() => {imgIndex < images.length-1 ? setImgIndex(imgIndex + 1):setImgIndex(0)}} />
          <X className="close" onClick={() => setImgIndex(null)} />
        </div>
      )}

      <div className="bigImg">
        <img src={images[0]} alt="Room image" onClick={() => setImgIndex(0)} />
      </div>
      <div className="smallImg">
        {images.slice(1).map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Room image"
            onClick={() => setImgIndex(index+1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
