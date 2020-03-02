import Slider from 'components/common/Slider';
import Gallery from 'components/common/Masonry';
import getCollectionsSelector from 'selectors/collections';
import React, { useEffect, FunctionComponent } from 'react';
import LastElementMasonry from 'components/Home/components/LastElementMasonry';
import { useRouter } from 'next/router';
import { getFullCategoriesSelector } from 'selectors/category';
import { fetchWomenCollection } from 'actions/womenCollection';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { fetchProductCategories } from 'actions/productCategories';
import Layout from 'components/layout/Layout';

// TODO: add selectors

export const Home: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

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
    <Layout>
      <Slider
        data={womenCollection}
        isLoad={wasLoadWomenCollection}
        onButtonClick={() => router.push('/shop')}
      />
      <Gallery
        dataArray={productCategories}
        isLoad={wasLoadProductCategories}
        fetchData={fetchProductCategories}
        onButtonClick={(category) =>
          router.push(`/shop?category=${category.toLowerCase()}`)
        }
        lastElement={LastElementMasonry}
      />
    </Layout>
  );
};

export default Home;
