import { createAction } from 'redux-actions';
import { SET_WOMEN_COLLECTION } from 'actions/actionTypes';
import { setToast } from 'actions/toast';
import ApiService from 'services/ApiService';
import { Dispatch } from 'redux';
import { getErrors } from 'reducers/Errors';
import { setCurrentUser } from './Authorize';

export const setWomenCollection = createAction(SET_WOMEN_COLLECTION);

export const fetchWomenCollection = () => async (dispatch: Dispatch) => {
  try {
    const options: any = {};
    if (localStorage.jwtToken) {
      options.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/collections', options);
    if (res.status === 401) {
      dispatch(setToast({ type: 'error', message: 'Sorry, you are unauthorized!' }));
      return dispatch(setCurrentUser({}));
    }
    const data = await res.json();
    if (!res.ok) {
      dispatch(setToast({ type: 'error', message: Object.values(data)[0] }));
      return dispatch(getErrors(data));
    }
    dispatch(setWomenCollection(data));
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};

export type womenCollectionActions = ReturnType<typeof setWomenCollection>;
