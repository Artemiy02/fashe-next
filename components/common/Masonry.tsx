import React, { useEffect, FunctionComponent } from 'react';
import Masonry from 'react-masonry-component';

import Loader from 'components/common/Loader';
import { IWomenCollection } from 'types/womenCollection';

interface IGalleryProps {
  dataArray: any[];
  isLoad: boolean;
  fetchData: () => void;
  onButtonClick: (arg?: any) => void;
  lastElement?: ReturnType<FunctionComponent>;
}

const Gallery: FunctionComponent<IGalleryProps> = ({
  dataArray,
  isLoad,
  fetchData,
  onButtonClick,
  lastElement
}) => {
  useEffect(() => {
    if (isLoad) return;
    fetchData();
  }, [isLoad]);

  const elms = dataArray.map((element: IWomenCollection) => (
    <div
      className="block1 hov-img-zoom pos-relative m-b-30 m-r-30 w-pc-28 p-15"
      key={element._id}
    >
      <img src={element.image} alt="IMG-BENNER" />
      <div className="block1-wrapbtn w-size2">
        <button
          type="button"
          className="flex-c-m size2 m-text2 bg3 hov1 trans-0-4"
          onClick={() => onButtonClick(element.title)}
        >
          {element.title}
        </button>
      </div>
    </div>
  ));

  return isLoad ? (
    <Masonry className="banner bgwhite p-t-40 p-b-40 container ">
      {lastElement ? [...elms, lastElement] : elms}
    </Masonry>
  ) : (
    <Loader />
  );
};

export default Gallery;
