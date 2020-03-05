import { createSelector } from 'reselect';
import { AppState } from 'reducers';

const auth = (state: AppState) => state.authorize.isAuthorize;

const authSelector = createSelector(auth, (item) => item);

export default authSelector;
