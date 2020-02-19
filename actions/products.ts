import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

import {
  SET_PRODUCTS, SET_PENDING_STATE, GET_PRODUCTS, SET_CURRENT_PAGE
} from 'actions/actionTypes';
import { setToast } from 'actions/toast';
import ApiService from 'services/ApiService';
import { getErrors } from 'reducers/Errors';
import { currentPageSelector, limitSelector } from 'selectors/products';
import { setCurrentUser } from './Authorize';

export const setProductsAction = createAction(SET_PRODUCTS);
export const setCurrentPageAction = createAction(SET_CURRENT_PAGE);
const actionSetPendingState = createAction(SET_PENDING_STATE);
const actionGetProducts = createAction(GET_PRODUCTS);

export const fetchProducts = () => async (dispatch: Dispatch) => {
  try {
    const options: any = {};
    if (localStorage.jwtToken) {
      options.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/products', options);
    if (res.status === 401) {
      dispatch(setToast({ type: 'error', message: 'Sorry, you are unauthorized!' }));
      return dispatch(setCurrentUser({}));
    }
    const data = await res.json();
    if (!res.ok) {
      dispatch(setToast({ type: 'error', message: Object.values(data)[0] }));
      return dispatch(getErrors(data));
    }
    dispatch(setProductsAction(data));
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};


export const getProducts = () => async (dispatch: Dispatch, getState: any) => {
  try {
    dispatch(actionSetPendingState(true));
    const state = getState();
    const page = currentPageSelector(state);
    const limit = limitSelector(state);

    const params: any = {
      qs: {
        limit,
        page,
      }
    };

    if (localStorage.jwtToken) {
      params.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/products', params);

    const data = await res.json();
    if (!res.ok) {
      dispatch(setToast({ type: 'error', message: Object.values(data)[0] }));
      return dispatch(getErrors(data));
    }
    const { headers } = res;
    const count = headers.get('x-total-count') && Number(headers.get('x-total-count'));

    dispatch(actionGetProducts({ data, count }));
    dispatch(actionSetPendingState(false));
  } catch (err) {
    console.log(err);
  }
};

export type productsActions = ReturnType<typeof setProductsAction>;
