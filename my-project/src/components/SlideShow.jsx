import React from "react";
import { Slide } from "react-slideshow-image";
import anh1 from "../image/slide1.png";
import anh2 from "../image/slide6.jpg";
import anh3 from "../image/slide8.jpeg";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";

const spanStyle = {
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  backgroundSize: "cover",
  height: "400px",
};
const slideImages = [
  {
    url: anh1,
  },
  {
    url: anh2,
  },
  {
    url: anh3,
  },
];

export default function SlideShow() {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
