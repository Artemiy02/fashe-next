import React, { FunctionComponent } from 'react';
import Masonry from 'react-masonry-component';

import { IProduct } from 'types/Shop';
import { useDispatch } from 'react-redux';
import { setCurrentPageAction } from 'actions/products';
import ProductItem from './ProductItem';
import Pagination from './Pagination';

interface IProductListProps {
  products: IProduct[];
}

const ProductList: FunctionComponent<IProductListProps> = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <div className="product-list-wrapper">
      <div style={{ width: '100%' }}>
        <Masonry className="p-l-30">
          {products && products.map(p => (
            <ProductItem key={p._id} product={p} />
          ))}
        </Masonry>
        <Pagination handlePageClick={p => dispatch(setCurrentPageAction(p.selected))} />
      </div>
    </div>
  );
};

export default ProductList;
