import React, { useEffect, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import Slider from 'components/common/Slider';
import Gallery from 'components/common/Masonry';

import 'react-animated-slider/build/horizontal.css';
import 'styles/slider-animating.css';

import { useStore, useDispatch, useSelector } from 'react-redux';
import { fetchProductCategories } from 'actions/productCategories';
import getCollectionsSelector from 'selectors/collections';
import { getFullCategoriesSelector } from 'selectors/category';
import { fetchWomenCollection } from 'actions/womenCollection';
import LastElementMasonry from './components/LastElementMasonry';

export const Home: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // fetching data
  const { wasLoadWomenCollection } = useStore().getState().womenCollection;
  const { wasLoadProductCategories } = useStore().getState().productCategories;

  useEffect(() => {
    if (!wasLoadProductCategories) dispatch(fetchProductCategories());
  }, [wasLoadProductCategories]);

  useEffect(() => {
    if (!wasLoadWomenCollection) dispatch(fetchWomenCollection());
  }, [wasLoadWomenCollection]);

  const productCategories = useSelector(getFullCategoriesSelector);
  const womenCollection = useSelector(getCollectionsSelector);

  return (
    <>
      <Slider
        data={womenCollection}
        isLoad={wasLoadWomenCollection}
        onButtonClick={() => history.push('/shop')}
      />
      <Gallery
        dataArray={productCategories}
        isLoad={wasLoadProductCategories}
        fetchData={fetchProductCategories}
        onButtonClick={category => history.push(`/shop?category=${category.toLowerCase()}`)
        }
        lastElement={LastElementMasonry}
      />
    </>
  );
};

export default Home;
