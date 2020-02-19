import { createAction } from 'redux-actions';
import { SET_TOAST, CLEAN_TOAST } from './actionTypes';

export const cleanToast = createAction(CLEAN_TOAST);
export const setToast = createAction(SET_TOAST);

export type toastActions = ReturnType<typeof cleanToast> | ReturnType<typeof setToast>;
