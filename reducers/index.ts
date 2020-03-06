import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import cartReducer from './cart';
import toastReducer from './toast';
import errorsReducer from './Errors';
import productsReducer from './products';
import authorizeReducer from './Authorize';
import womenCollectionReducer from './womenCollection';
import productCategoriesReducer from './productCategories';
import initPathReducer from './initialPath';

const rootReducer = combineReducers({
  toast: toastReducer,
  authorize: authorizeReducer,
  form: formReducer,
  womenCollection: womenCollectionReducer,
  productCategories: productCategoriesReducer,
  shop: productsReducer,
  cart: cartReducer,
  errors: errorsReducer,
  initPath: initPathReducer
});

export type AppState = any;

export default rootReducer;
