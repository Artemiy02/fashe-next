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
import Cookie from 'js-cookie';
import { TOKEN_STORAGE_KEY } from 'services/auth_token';

export const fetchProducts = () => async (dispatch: Dispatch) => {
  try {
    const options: any = {};
    const token = Cookie.get(TOKEN_STORAGE_KEY);
    if (token) {
      options.headers = { Authorization: token };
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

    const token = Cookie.get(TOKEN_STORAGE_KEY);
    if (token) {
      params.headers = { Authorization: token };
    }

    const res = await ApiService.get('/shop/products', params);

    const data = await res.json();
    if (!res.ok) {
      dispatch(
        setToast({ type: 'error', message: Object.values(data)[0].toString() })
      );
      return dispatch(getErrors(data));
    }

    dispatch(actionGetProducts(data));
    dispatch(actionSetPendingState(false));
  } catch (err) {
    console.log(err);
  }
};

export type productsActions = ReturnType<typeof setProductsAction>;
