import { createActionCreator, createReducer } from 'deox';
import { SET_TOAST, CLEAN_TOAST } from 'actions/actionTypes';

export interface IToastState {
  type: null | string;
  message: string;
}

const initialState: IToastState = {
  type: null,
  message: ''
};

export const setToast = createActionCreator(
  SET_TOAST,
  (resolve) => (payload: IToastState) => resolve(payload)
);
export const cleanToast = createActionCreator(CLEAN_TOAST);

const toastReducer = createReducer(initialState, (handleAction) => [
  handleAction(setToast, (state, action) => ({
    ...state,
    type: action.payload.type,
    message: action.payload.message
  })),
  handleAction(cleanToast, (state, action) => ({
    ...state,
    type: null,
    message: ''
  }))
]);

export default toastReducer;
