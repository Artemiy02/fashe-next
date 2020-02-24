import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCartAction } from 'actions/cart';

export interface ICartHeaderItemProps {
  id: string | number;
  image: string;
  title: string;
  count: number;
  price: string;
  openPortal: (event?: any) => void;
}

const CartHeaderItem: FunctionComponent<ICartHeaderItemProps> = ({
  id,
  image,
  title,
  count,
  price,
  openPortal
}) => {
  const dispatch = useDispatch();

  return (
    <li className="header-cart-item">
      <div
        className="header-cart-item-img"
        onClick={() => {
          dispatch(deleteFromCartAction(id));
          return openPortal;
        }}
      >
        <img src={image} alt="IMG" />
      </div>

      <div className="header-cart-item-txt">
        <button type="button" className="header-cart-item-name">
          {title}
        </button>

        <span className="header-cart-item-info">
          {count}
          {' '}
x
          {' '}
          {price}
        </span>
      </div>
    </li>
  );
};

export default CartHeaderItem;
