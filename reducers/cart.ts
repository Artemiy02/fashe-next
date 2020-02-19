import { handleActions } from 'redux-actions';

import { IProduct } from 'types/Shop';
import { cartsActions } from 'actions/cart';
import { ADD_TO_CART, DELETE_FROM_CART } from '../actions/actionTypes';

export interface ICartProduct extends IProduct {
  count: number | 0;
}

export type cartState = ICartProduct[];

export const initialState: cartState = [];

const reducer = handleActions(
  {
    [ADD_TO_CART]:
      (state: cartState, action: cartsActions): cartState => state
        .find(prod => prod._id === action.payload._id)
        ? state.map(prod => {
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
        ],

    [DELETE_FROM_CART]:
      (state: cartState, action: cartsActions): cartState => state
        .filter(product => product._id !== action.payload)
  },
  initialState
);

export default reducer;
