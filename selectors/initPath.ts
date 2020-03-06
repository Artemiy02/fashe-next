import { createSelector } from 'reselect';
import { AppState } from 'reducers';

const initPath = (state: AppState) => state.initPath;

const initPathSelector = createSelector(initPath, (item) => item.initialPath);

export default initPathSelector;
