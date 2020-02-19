import { createSelector } from 'reselect';
import { ICategory } from 'types/Shop';
import { AppState } from 'reducers';

const categories = (state: AppState) => state.productCategories.productCategories as ICategory[];

export const getFullCategoriesSelector = createSelector(
  categories,
  items => items
);

const getCategoriesSelector = createSelector(
  categories,
  items => items.map(c => ({ title: c.title }))
);

export default getCategoriesSelector;
