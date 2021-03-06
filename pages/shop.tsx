/* eslint-disable */
// import queryString from 'query-string';
import Layout from 'components/layout/Layout';
import getCategoriesSelector from 'selectors/category';
import LeftBar from 'components/Shop/components/LeftBar';
import ProductList from 'components/Shop/components/ProductList';
import React, { useEffect, FunctionComponent, useState } from 'react';
import { getProducts } from 'actions/products';
import { ICategory, IProduct } from 'types/Shop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductCategories } from 'actions/productCategories';
import { useRouter } from 'next/router';
import {
  currentPageSelector,
  productsByPageSelector,
  getWasLoadProductsSelector
} from 'selectors/products';
import { PrivateRoute } from 'components/common/PrivateRoute';
import { NextPage } from 'next';

const Shop = (props) => {
  const currentPage = useSelector(currentPageSelector);
  const products = useSelector(productsByPageSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  // fetching data
  const wasLoadProductCategories = useSelector(getWasLoadProductsSelector);

  useEffect(() => {
    if (!wasLoadProductCategories) dispatch(fetchProductCategories());
  }, [wasLoadProductCategories]);

  useEffect(() => {
    dispatch(getProducts());
  }, [currentPage, dispatch]);

  // const [queryParam, setQueryParam] = useState(props.queryParam);
  const initialCategory = { title: 'All', isActive: true } as ICategory;

  const categoriesInStore = useSelector(getCategoriesSelector);
  const [allCategories, setAllCategories] = useState([
    initialCategory,
    ...categoriesInStore
  ]);

  const changeActiveCategory = (str: string) => {
    setAllCategories(
      allCategories.map((c) =>
        c.title.toLocaleLowerCase() === str.toLocaleLowerCase()
          ? { ...c, isActive: true }
          : { ...c, isActive: false }
      )
    );
  };

  const queryParam = router?.query?.category?.toString();

  useEffect(() => {
    if (Array.isArray(categoriesInStore) && categoriesInStore.length) {
      setAllCategories([initialCategory, ...categoriesInStore]);
    }
    if (queryParam && allCategories.length > 1) {
      const exist = allCategories.find(
        (c) => c.title.toLowerCase() === queryParam.toLowerCase()
      );
      console.log('exist: ', exist);
      exist ? changeActiveCategory(queryParam) : changeActiveCategory('all');
    }
  }, [allCategories.length, categoriesInStore]);

  return (
    <Layout>
      <section className="bgwhite p-t-55 p-b-65">
        <div className="container">
          <div className="row">
            <LeftBar
              categories={allCategories}
              changeActiveCategory={changeActiveCategory}
            />
            <ProductList products={products} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

Shop.getInitialProps = async (ctx) => {
  console.log('---Query---', ctx.query.category);
  const category = ctx?.query?.category;
  return category
    ? {
        queryParam: category
      }
    : {};
};

export default PrivateRoute(Shop);
