import { useEffect, useState } from "react";
import { ImageDataType } from "../../types/image.types";
import { transparentImageData } from "./data";
import "./styles.scss";

const TransparentSlider = () => {
  const [sliderData, setSliderData] = useState<Array<ImageDataType>>([]);

  const expandElement = (node: any, index: number) => {
    const expandClassName = "image-expand";
    // const sliderElements: HTMLCollectionOf<Element> =
    //   document.getElementsByClassName("slider-item");
    // expandElement(sliderElements?.item(0)?.classList?.add(expandClassName));
    console.log({ node });

    const containerEl = document
      .getElementsByClassName("slider-container")
      .item(0);
    const sliderEl: any = document
      .getElementsByClassName("slider-list")
      .item(0);
    console.log({ containerEl, sliderEl });

    // Get the bounding rectangle of the original element (relative to the viewport)
    const rect = node.getBoundingClientRect();
    if (!containerEl || !sliderEl) return;

    // Get the bounding rectangle of the container (relative to the viewport)
    const containerRect = containerEl.getBoundingClientRect();

    // Calculate the position of the original element relative to the container
    const top = rect.top - containerRect.top;
    const left = rect.left - containerRect.left;

    // Clone the original element
    const clone = node.cloneNode(true);
    sliderEl.style.display = "none";

    // Set the cloned element's initial position to match the original element's position relative to the container
    clone.style.position = "absolute";
    clone.style.top = `${top}px`;
    clone.style.left = `${left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;

    // Append the cloned element to the container
    containerEl.appendChild(clone);

    // Trigger reflow to ensure the position is applied before expanding
    clone.getBoundingClientRect();
    clone.removeAttribute("onClick");

    // Add the expand class to initiate the animation
    // clone.classList.remove("slider-item");
    clone.classList.add(expandClassName);

    // Listen for the end of the transition to show the slider again
    clone.addEventListener("animationend", () => {
      // After the transition ends, show the slider again
      sliderEl.style.display = "flex";
      console.log("animation end");

      // Optionally, you can remove the clone if you no longer need it
      // clone.remove();

      setSliderData((prevData: Array<ImageDataType>) => {
        const data = [...prevData];
        const dataToShift = data?.slice(0, index + 1);
        console.log({ data, dataToShift });
        return [...data?.slice(index + 1), ...dataToShift];
      });
    });
  };

  const removeExpandClass = () => {
    console.log("remove");
    const sliderEls = document.getElementsByClassName("slider-image");

    console.log({ sliderEls });

    // Iterate over the HTMLCollection
    for (let i = 0; i < sliderEls.length; i++) {
      const el = sliderEls[i];
      console.log(`Clicked element at index ${i}`, { el });
      el.classList.remove("expand");
    }
  };

  // const animateSliderImageExpand = () => {
  //   console.log("expand");
  //   const expandClassName = "image-expand";
  //   const sliderElements: HTMLCollectionOf<Element> =
  //     document.getElementsByClassName("slider-item");
  //   expandElement(sliderElements?.item(0)?.classList?.add(expandClassName));

  //   // setTimeout(
  //   //   () => sliderElements?.item(-1)?.classList?.remove(expandClassName),
  //   //   2100
  //   // );
  // };

  const handleImageChange = (node: EventTarget, index: number) => {
    expandElement(node, index);

    // setSliderData((prevData: Array<ImageDataType>) => {
    //   const data = [...prevData];
    //   const dataToShift = data?.slice(0, index + 1);
    //   console.log({ data, dataToShift });
    //   return [...data?.slice(index + 1), ...dataToShift];
    // });
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
            className={"slider-item"}
            key={`${imageData?.name}-${index}`}
            onClick={(event) => handleImageChange(event.target, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TransparentSlider;
