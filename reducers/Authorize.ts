import { SET_CURRENT_USER } from 'actions/actionTypes';
import { handleActions } from 'redux-actions';
import isEmpty from 'utils/is-empty';
import { authorizeActions } from 'actions/Authorize';

export interface IAuthorizeState {
  isAuthorize: boolean;
  user: object;
}

export const initialState: IAuthorizeState = {
  isAuthorize: false,
  user: {}
};

const reducer = handleActions(
  {
    [SET_CURRENT_USER]: (state: IAuthorizeState, action: authorizeActions): IAuthorizeState => ({
      ...state,
      isAuthorize: !isEmpty(action.payload),
      user: action.payload
    })
  },
  initialState
);

export default reducer;
