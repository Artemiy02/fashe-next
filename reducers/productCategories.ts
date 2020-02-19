import { handleActions } from 'redux-actions';
import { IProductCategory } from 'types/productCategory';
import { productCategoriesActions } from 'actions/productCategories';
import { SET_PRODUCT_CATEGORIES } from '../actions/actionTypes';

export interface IProductCategoryState {
  productCategories: IProductCategory[];
  wasLoadProductCategories: boolean;
}

export const initialState: IProductCategoryState = {
  productCategories: [],
  wasLoadProductCategories: false
};

const reducer = handleActions(
  {
    [SET_PRODUCT_CATEGORIES]: (
      state: IProductCategoryState,
      action: productCategoriesActions
    ): IProductCategoryState => ({
      ...state,
      productCategories: action.payload,
      wasLoadProductCategories: true
    })
  },
  initialState
);

export default reducer;
