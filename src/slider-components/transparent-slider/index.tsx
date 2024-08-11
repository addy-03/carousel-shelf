import { useState } from "react";
import imgSrc from "../../assets/birds/blue-jay.jpg";
import { transparentImageData } from "./data";
import "./styles.scss";

const TransparentSlider = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  return (
    <div className="slider-container">
      <figure className="slider-cover">
        <img
          src={transparentImageData?.at(currentImgIndex)?.imageSrc}
          alt=""
          className="image"
        />
      </figure>

      <section className="slider-details">
        <h2 className="heading">Lorem, ipsum.</h2>
        <p className="details">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
          quis quo!
        </p>
      </section>

      <div className="slider-list">
        {transparentImageData
          ?.filter((_: any, index: number) => index !== currentImgIndex)
          ?.map((imageData: any) => (
            <img
              src={imageData?.imageSrc}
              alt={imageData?.name}
              className="item"
              key={imageData?.name}
            />
          ))}
      </div>
    </div>
  );
};

export default TransparentSlider;
