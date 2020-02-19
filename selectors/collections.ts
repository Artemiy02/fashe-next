import { createSelector } from 'reselect';

import { IWomenCollection } from 'types/womenCollection';
import { AppState } from 'reducers';

const categories = (state: AppState) =>
  state.womenCollection.womenCollection as IWomenCollection[];

const getCollectionsSelector = createSelector(
  categories,
  items => items
);

export default getCollectionsSelector;
