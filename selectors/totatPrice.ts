import { createSelector } from 'reselect';
import { AppState } from 'reducers';
import { ICartProduct } from 'reducers/cart';

const cart = (state: AppState) => state.cart;

export const totalPriceSelector = createSelector(
  cart,
  items =>
    items.reduce(
      (acc: number, prod: ICartProduct) =>
        +(acc + prod.count * parseFloat(prod.price)).toFixed(2),
      0
    )
);

export const totalCountSelector = createSelector(
  cart,
  items =>
    items.reduce((acc: number, prod: ICartProduct) => acc + prod.count, 0)
);
