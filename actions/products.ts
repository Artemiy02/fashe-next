import { Dispatch } from 'redux';

import { setToast } from 'reducers/toast';
import ApiService from 'services/ApiService';
import { getErrors } from 'reducers/Errors';
import { currentPageSelector, limitSelector } from 'selectors/products';
import {
  setProductsAction,
  actionSetPendingState,
  actionGetProducts
} from 'reducers/products';
import { setCurrentUser } from 'reducers/Authorize';

export const fetchProducts = () => async (dispatch: Dispatch) => {
  try {
    const options: any = {};
    if (localStorage.jwtToken) {
      options.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/products', options);
    if (res.status === 401) {
      dispatch(
        setToast({ type: 'error', message: 'Sorry, you are unauthorized!' })
      );
      return dispatch(setCurrentUser({}));
    }
    const data = await res.json();
    if (!res.ok) {
      dispatch(
        setToast({ type: 'error', message: Object.values(data)[0].toString() })
      );
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
        page
      }
    };

    if (localStorage.jwtToken) {
      params.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/products', params);

    const data = await res.json();
    if (!res.ok) {
      dispatch(
        setToast({ type: 'error', message: Object.values(data)[0].toString() })
      );
      return dispatch(getErrors(data));
    }
    const { headers } = res;
    const count = Number(headers?.get('x-total-count'));

    dispatch(actionGetProducts({ data, count }));
    dispatch(actionSetPendingState(false));
  } catch (err) {
    console.log(err);
  }
};

export type productsActions = ReturnType<typeof setProductsAction>;
