import { handleActions } from 'redux-actions';
import { SET_TOAST, CLEAN_TOAST } from 'actions/actionTypes';
import { toastActions } from 'actions/toast';

export interface IToastState {
  type: null | string;
  message: string;
}

const initialState: IToastState = {
  type: null,
  message: ''
};

const toastReducer = handleActions(
  {
    [SET_TOAST]: (state: IToastState, action: toastActions): IToastState => ({
      ...state,
      type: action.payload.type,
      message: action.payload.message
    }),
    [CLEAN_TOAST]: (state: IToastState): IToastState => ({
      ...state,
      type: null,
      message: ''
    })
  },
  initialState
);

export default toastReducer;
