import { useEffect, useState } from "react";
import { ImageDataType } from "../../types/image.types";
import { transparentImageData } from "./data";
import "./styles.scss";

const TransparentSlider = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [sliderData, setSliderData] = useState<Array<ImageDataType>>([]);

  const handleImageChange = (index: number) => {
    setSliderData((prevData: Array<ImageDataType>) => {
      const data = [...prevData];
      const dataToShift = data?.slice(0, index + 1);
      console.log({ data, dataToShift });
      return [...data?.slice(index + 1), ...dataToShift];
    });
  };

  console.log({ sliderData });

  useEffect(() => {
    setSliderData(transparentImageData);
    // handleImageChange(0);
  }, []);

  return (
    <div className="slider-container">
      <figure className="slider-cover">
        <img src={sliderData?.at(-1)?.imageSrc} alt="" className="image" />
      </figure>

      <section className="slider-details">
        <h2 className="heading">{sliderData?.at(-1)?.name}</h2>
        <p className="details">{sliderData?.at(-1)?.description}</p>
      </section>

      <div className="slider-list">
        {sliderData?.map((imageData: any, index) => (
          <img
            src={imageData?.imageSrc}
            alt={imageData?.name}
            className="item"
            key={imageData?.name}
            onClick={() => handleImageChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TransparentSlider;
