import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authorizeReducer from './Authorize';
import toastReducer from './toast';
import womenCollectionReducer from './womenCollection';
import productCategoriesReducer from './productCategories';
import productsReducer from './products';
import cartReducer from './cart';
import errorsReducer from './Errors';

const rootReducer = combineReducers({
  toast: toastReducer,
  authorize: authorizeReducer,
  form: formReducer,
  womenCollection: womenCollectionReducer,
  productCategories: productCategoriesReducer,
  shop: productsReducer,
  cart: cartReducer,
  errors: errorsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
