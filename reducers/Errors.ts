import { GET_ERRORS } from 'actions/actionTypes';
import { createActionCreator, createReducer } from 'deox';

export const getErrors = createActionCreator(
  GET_ERRORS,
  (resolve) => (error: IErrors) => resolve(error)
);

export interface IErrors {
  [key: string]: string;
}

const initialState: IErrors = {};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(getErrors, (state, action) => action.payload)
]);

export default reducer;
