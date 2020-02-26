import { createActionCreator, createReducer } from 'deox';
import { SET_WOMEN_COLLECTION } from 'actions/actionTypes';
import { IWomenCollection } from 'types/womenCollection';

export interface IWomenCollectionState {
  womenCollection: IWomenCollection[];
  wasLoadWomenCollection: boolean;
}

export const initialState: IWomenCollectionState = {
  womenCollection: [],
  wasLoadWomenCollection: false
};

export const setWomenCollection = createActionCreator(
  SET_WOMEN_COLLECTION,
  (resolve) => (payload: IWomenCollection[]) => resolve(payload)
);

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(setWomenCollection, (state, action) => ({
    ...state,
    womenCollection: action.payload,
    wasLoadWomenCollection: true
  }))
]);

export default reducer;
