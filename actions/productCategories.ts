import ApiService from 'services/ApiService';
import { Dispatch } from 'redux';
import { setToast } from 'reducers/toast';
import { getErrors } from 'reducers/Errors';
import { setCurrentUser } from 'reducers/Authorize';
import { setProductCategoriesAction } from 'reducers/productCategories';

export const fetchProductCategories = () => async (dispatch: Dispatch) => {
  try {
    const options: any = {};
    if (localStorage.jwtToken) {
      options.headers = { Authorization: localStorage.jwtToken };
    }
    const res = await ApiService.get('/shop/product-categories', options);
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
    dispatch(setProductCategoriesAction(data));
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};
