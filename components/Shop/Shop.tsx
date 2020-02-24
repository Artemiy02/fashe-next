import React, { useEffect, FunctionComponent, useState } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';

import { fetchProductCategories } from 'actions/productCategories';
import { getProducts } from 'actions/products';
import 'styles/shop.scss';
import { currentPageSelector, productsByPageSelector } from 'selectors/products';
import getCategoriesSelector from 'selectors/category';
import { ICategory, IProduct } from 'types/Shop';
import LeftBar from './components/LeftBar';
import ProductList from './components/ProductList';


const Shop: FunctionComponent = () => {
  const currentPage = useSelector(currentPageSelector);
  const products: IProduct[] = useSelector(productsByPageSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // fetching data
  const { wasLoadProductCategories } = useStore().getState().productCategories;

  useEffect(() => {
    if (!wasLoadProductCategories) dispatch(fetchProductCategories());
  }, [wasLoadProductCategories]);

  useEffect(() => {
    dispatch(getProducts());
  }, [currentPage, dispatch]);

  const [query, setQuery] = useState(null);
  const initialCategory = { title: 'All', isActive: true } as ICategory;

  const [allCategories, setAllCategories] = useState([
    initialCategory
  ] as ICategory[]);

  const changeActiveCategory = (str: string) => setAllCategories(
    allCategories.map(c => c.title.toLocaleLowerCase() === str.toLocaleLowerCase()
      ? { ...c, isActive: true }
      : { ...c, isActive: false })
  );

  const categoriesInStore = useSelector(getCategoriesSelector);

  useEffect(() => {
    if (Array.isArray(categoriesInStore) && categoriesInStore.length) {
      setAllCategories([initialCategory, ...categoriesInStore]);
      setQuery(queryString.parse(location.search).category as string);
    }
  }, [categoriesInStore, queryString.parse(location.search).category]);

  useEffect(() => {
    if (query) {
      const exist = (categoriesInStore as ICategory[]).find(
        c => c.title.toLowerCase() === query.toLowerCase()
      );
      exist ? changeActiveCategory(query) : changeActiveCategory('all');
    }
  }, [query]);

  return (
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
  );
};

export default Shop;
