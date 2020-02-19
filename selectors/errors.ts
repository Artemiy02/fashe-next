import { createSelector } from 'reselect';
import { AppState } from 'reducers';

const errors = (state: AppState) => state.errors;

const errorsSelector = createSelector(
  errors,
  items => items
);

export default errorsSelector;
