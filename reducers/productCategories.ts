import { createActionCreator, createReducer } from 'deox';
import { SET_PRODUCT_CATEGORIES } from '../actions/actionTypes';
import { IProductCategory } from 'types/productCategory';

export const setProductCategoriesAction = createActionCreator(
  SET_PRODUCT_CATEGORIES,
  (resolve) => (payload: IProductCategory[]) => resolve(payload)
);

export interface IProductCategoryState {
  productCategories: IProductCategory[];
  wasLoadProductCategories: boolean;
}

export const initialState: IProductCategoryState = {
  productCategories: [],
  wasLoadProductCategories: false
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(setProductCategoriesAction, (state, action) => ({
    ...state,
    productCategories: action.payload,
    wasLoadProductCategories: true
  }))
]);

export default reducer;
