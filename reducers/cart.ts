import { createActionCreator, createReducer } from 'deox';

import { IProduct } from 'types/Shop';
import { ADD_TO_CART, DELETE_FROM_CART } from '../actions/actionTypes';

export interface ICartProduct extends IProduct {
  count: number | 0;
}

export const addToCartAction = createActionCreator(
  ADD_TO_CART,
  (resolve) => (cartsProduct: ICartProduct) => resolve(cartsProduct)
);

export const deleteFromCartAction = createActionCreator(
  DELETE_FROM_CART,
  (resolve) => (id: string | number) => resolve(id)
);

export type cartState = ICartProduct[];
export const initialState: cartState = [];

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(addToCartAction, (state, action) =>
    state.find((prod) => prod._id === action.payload._id)
      ? state.map((prod) => {
          if (prod._id === action.payload._id) {
            return {
              ...prod,
              count: prod.count + 1
            };
          }
          return prod;
        })
      : [
          ...state,
          {
            ...action.payload,
            count: 1
          }
        ]
  ),
  handleAction(deleteFromCartAction, (state, action) =>
    state.filter((product) => product._id !== action.payload)
  )
]);

export default reducer;
