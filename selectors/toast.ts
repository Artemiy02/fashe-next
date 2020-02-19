import { createSelector } from 'reselect';
import { AppState } from 'reducers';

const toast = (state: AppState) => state.toast;

const getToastSelector = createSelector(
  toast,
  items => items
);

export default getToastSelector;
