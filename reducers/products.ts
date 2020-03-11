import { createActionCreator, createReducer } from 'deox';
import { IProduct } from 'types/Shop';
import {
  SET_PRODUCTS,
  SET_PENDING_STATE,
  GET_PRODUCTS,
  SET_CURRENT_PAGE
} from '../actions/actionTypes';

export const setProductsAction = createActionCreator(
  SET_PRODUCTS,
  (resolve) => (payload: IProduct[]) => resolve(payload)
);
export const setCurrentPageAction = createActionCreator(
  SET_CURRENT_PAGE,
  (resolve) => (payload: number) => resolve(payload)
);
export const actionSetPendingState = createActionCreator(
  SET_PENDING_STATE,
  (resolve) => (payload: boolean) => resolve(payload)
);
export const actionGetProducts = createActionCreator(
  GET_PRODUCTS,
  (resolve) => (payload: any) => resolve(payload)
);
export interface IProductsState {
  items: { [key: number]: IProduct[] };
  currentPage: number;
  limit: number;
  count: number;
  pending: boolean;
  products: IProduct[];
  wasLoadProducts: boolean;
}

export const initialState: IProductsState = {
  items: { 0: [] },
  currentPage: 0,
  limit: 6,
  count: 0,
  pending: false,
  products: [],
  wasLoadProducts: false
};

const getProducts = (state, action) => {
  const newItems = { ...state.items };
  newItems[state.currentPage] = action.payload.products;
  return {
    ...state,
    items: newItems,
    count: action.payload.count
  };
};

const setCurrentPage = (state, action) => ({
  ...state,
  currentPage: action.payload
});

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(setProductsAction, (state, action) => ({
    ...state,
    products: action.payload,
    wasLoadProducts: true
  })),
  handleAction(setCurrentPageAction, setCurrentPage),
  handleAction(actionSetPendingState, (state, action) => ({
    ...state,
    pending: action.payload
  })),
  handleAction(actionGetProducts, getProducts)
]);

export default reducer;
