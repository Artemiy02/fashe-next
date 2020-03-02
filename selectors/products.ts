import { AppState } from 'reducers';
import { createSelector } from 'reselect';

const shop = (state: AppState) => state.shop;

const getProductsSelector = createSelector(shop, (items) => items.products);

export const getWasLoadProductsSelector = createSelector(
  shop,
  (items) => items.wasLoadProducts
);

export const getProductsItemsSelector = createSelector(shop, (items) => {
  return items.items;
});

export const currentPageSelector = createSelector(
  [shop],
  (items) => items.currentPage
);

export const productsByPageSelector = createSelector(
  [getProductsItemsSelector, currentPageSelector],
  (items, page) => items.get(page)
);

export const pageCountSelector = createSelector([shop], (items) => {
  return Math.ceil(items.count / items.limit);
});

export const countSelector = createSelector([shop], (items) => items.count);

export const limitSelector = createSelector([shop], (items) => items.limit);

export default getProductsSelector;
