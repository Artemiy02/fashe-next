import { SET_INITIAL_PATH } from 'actions/actionTypes';
import { createActionCreator, createReducer } from 'deox';

export interface IInitPathState {
  initialPath: string;
}

export const initialState: IInitPathState = {
  initialPath: ''
};

export const setInitialPath = createActionCreator(
  SET_INITIAL_PATH,
  (resolve) => (path: string) => {
    return resolve(path);
  }
);

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(setInitialPath, (state, { payload }) => ({
    ...state,
    initialPath: payload
  }))
]);

export default reducer;
