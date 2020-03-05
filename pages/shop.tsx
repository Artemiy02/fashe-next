import 'styles/shop.scss';
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

const Shop: FunctionComponent = () => {
  const currentPage = useSelector(currentPageSelector);
  const products = useSelector(productsByPageSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [location]);

  // fetching data
  const wasLoadProductCategories = useSelector(getWasLoadProductsSelector);

  useEffect(() => {
    if (!wasLoadProductCategories) dispatch(fetchProductCategories());
  }, [wasLoadProductCategories]);

  useEffect(() => {
    dispatch(getProducts());
  }, [currentPage, dispatch]);

  const [queryParam, setQueryParam] = useState(null);
  const initialCategory = { title: 'All', isActive: true } as ICategory;

  const [allCategories, setAllCategories] = useState([
    initialCategory
  ] as ICategory[]);

  const changeActiveCategory = (str: string) =>
    setAllCategories(
      allCategories.map((c) =>
        c.title.toLocaleLowerCase() === str.toLocaleLowerCase()
          ? { ...c, isActive: true }
          : { ...c, isActive: false }
      )
    );

  const categoriesInStore = useSelector(getCategoriesSelector);

  useEffect(() => {
    if (Array.isArray(categoriesInStore) && categoriesInStore.length) {
      setAllCategories([initialCategory, ...categoriesInStore]);
      setQueryParam(router?.query?.category);
    }
  }, [categoriesInStore, router?.query?.category]);

  useEffect(() => {
    if (queryParam) {
      const exist = (categoriesInStore as ICategory[]).find(
        (c) => c.title.toLowerCase() === queryParam.toLowerCase()
      );
      exist ? changeActiveCategory(queryParam) : changeActiveCategory('all');
    }
  }, [queryParam]);

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

export default Shop;
