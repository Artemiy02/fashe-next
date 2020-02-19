import { GET_ERRORS } from 'actions/actionTypes';
import { handleActions, createAction } from 'redux-actions';

export const getErrors = createAction(GET_ERRORS);

export type errorActions = ReturnType<typeof getErrors>;

export interface IErrors {
  [key: string]: string;
}

const initialState: IErrors = {};

const reducer = handleActions(
  {
    [GET_ERRORS]: (state: IErrors, action: errorActions): IErrors => action.payload
  },
  initialState
);

export default reducer;
