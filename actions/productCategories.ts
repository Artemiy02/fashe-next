import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

import { SET_PRODUCT_CATEGORIES } from 'actions/actionTypes';
import { setToast } from 'actions/toast';
import ApiService from 'services/ApiService';
import { getErrors } from 'reducers/Errors';
import { setCurrentUser } from './Authorize';

export const setProductCategoriesAction = createAction(SET_PRODUCT_CATEGORIES);

export const fetchProductCategories = () => async (dispatch: Dispatch) => {
  try {
    const options: any = {};
    if (localStorage.jwtToken) {
      options.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/product-categories', options);
    if (res.status === 401) {
      dispatch(setToast({ type: 'error', message: 'Sorry, you are unauthorized!' }));
      return dispatch(setCurrentUser({}));
    }
    const data = await res.json();
    
    if (!res.ok) {
      dispatch(setToast({ type: 'error', message: Object.values(data)[0] }));
      return dispatch(getErrors(data));
    }    
    dispatch(setProductCategoriesAction(data));
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};

export type productCategoriesActions = ReturnType<
  typeof setProductCategoriesAction
>;
