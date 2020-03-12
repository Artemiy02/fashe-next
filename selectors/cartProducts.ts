import { createSelector } from 'reselect';
import { AppState } from 'reducers';

const products = (state: AppState) => state.cart;

const getCartProductsSelector = createSelector(products, (items) => items);

export default getCartProductsSelector;
