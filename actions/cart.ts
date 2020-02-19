import { createAction } from 'redux-actions';

import { ADD_TO_CART, DELETE_FROM_CART } from 'actions/actionTypes';

export const addToCartAction = createAction(ADD_TO_CART);
export const deleteFromCartAction = createAction(DELETE_FROM_CART);

export type cartsActions =
  | ReturnType<typeof addToCartAction>
  | ReturnType<typeof deleteFromCartAction>;
