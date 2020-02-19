import { handleActions } from 'redux-actions';
import { IProduct } from 'types/Shop';
import { productsActions } from 'actions/products';
import {
  SET_PRODUCTS, SET_PENDING_STATE, GET_PRODUCTS, SET_CURRENT_PAGE
} from '../actions/actionTypes';

export interface IProductsState {
  items: Map<number, IProduct[]>,
  currentPage: number,
  limit: number,
  count: number,
  pending: boolean,
  products: IProduct[];
  wasLoadProducts: boolean;
}

export const initialState: IProductsState = {
  items: new Map([
    [0, []],
  ]),
  currentPage: 0,
  limit: 6,
  count: 0,
  pending: false,
  products: [],
  wasLoadProducts: false
};

const getProducts = (state: IProductsState, action: productsActions) => {
  const newItems = new Map(state.items);
  newItems.set(state.currentPage, action.payload.data);

  return {
    ...state,
    items: newItems,
    count: action.payload.count,
  };
};

const setCurrentPage = (state: IProductsState, action: productsActions) => ({
  ...state,
  currentPage: action.payload
});

const reducer = handleActions(
  {
    [SET_PRODUCTS]: (
      state: IProductsState,
      action: productsActions
    ): IProductsState => ({
      ...state,
      products: action.payload,
      wasLoadProducts: true
    }),
    [SET_PENDING_STATE]: (
      state: IProductsState,
      action: productsActions
    ): IProductsState => ({
      ...state,
      pending: action.payload,
    }),
    [GET_PRODUCTS]: getProducts,
    [SET_CURRENT_PAGE]: setCurrentPage
  },
  initialState
);

export default reducer;
