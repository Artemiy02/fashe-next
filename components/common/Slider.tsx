import React, { FunctionComponent } from 'react';
import ReactSlider from 'react-animated-slider';

import Loader from 'components/common/Loader';
import { IWomenCollection } from 'types/womenCollection';
import { IReactSliderProps } from 'types/Slider';

const NextButton = () => (
  <button type="button" className="arrow-slick1 next-slick1">
    <i className="fa  fa-angle-right" aria-hidden="true" />
  </button>
);
const PrevButton = () => (
  <button type="button" className="arrow-slick1 prev-slick1">
    <i className="fa  fa-angle-left" aria-hidden="true" />
  </button>
);

const Slider: FunctionComponent<IReactSliderProps> = ({
  data,
  isLoad,
  onButtonClick
}) => isLoad ? (
  <ReactSlider
    nextButton={<NextButton />}
    previousButton={<PrevButton />}
    autoplay={2300}
    classNames={{
      slider: 'my-slider'
    }}
  >
    {data.map((item: IWomenCollection) => (
      <div
        key={item._id}
        style={{
          background: `url('${item.image}') no-repeat center center`
        }}
      >
        <div className="inner">
          <p
            className="caption1-slide1 m-text1 t-center animated m-b-15"
            data-appear="rollIn"
          >
            {item.title}
          </p>
          <h1
            className="caption2-slide1 xl-text1 t-center animated m-b-37"
            data-appear="lightSpeedIn"
          >
            {item.description}
          </h1>
          <div className="wrap-btn-slide1 w-size1">
            <button
              type="button"
              className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4"
              onClick={onButtonClick}
            >
                Shop Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </ReactSlider>
) : (
  <Loader />
);

export default Slider;
