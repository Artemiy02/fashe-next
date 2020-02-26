import { SET_CURRENT_USER } from 'actions/actionTypes';
import { createActionCreator, createReducer } from 'deox';
import isEmpty from 'utils/is-empty';

export interface IAuthorizeState {
  isAuthorize: boolean;
  user: object;
}

export const initialState: IAuthorizeState = {
  isAuthorize: false,
  user: {}
};

export const setCurrentUser = createActionCreator(
  SET_CURRENT_USER,
  (resolve) => (user: object) => resolve(user)
);

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(setCurrentUser, (state, action) => ({
    ...state,
    isAuthorize: !isEmpty(action.payload),
    user: action.payload
  }))
]);

export default reducer;
