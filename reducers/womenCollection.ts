import { handleActions } from 'redux-actions';
import { SET_WOMEN_COLLECTION } from 'actions/actionTypes';
import { IWomenCollection } from 'types/womenCollection';
import { womenCollectionActions } from 'actions/womenCollection';

export interface IWomenCollectionState {
  womenCollection: IWomenCollection[];
  wasLoadWomenCollection: boolean;
}

export const initialState: IWomenCollectionState = {
  womenCollection: [],
  wasLoadWomenCollection: false
};

const reducer = handleActions(
  {
    [SET_WOMEN_COLLECTION]: (
      state: IWomenCollectionState,
      action: womenCollectionActions
    ): IWomenCollectionState => ({
      ...state,
      womenCollection: action.payload,
      wasLoadWomenCollection: true
    })
  },
  initialState
);

export default reducer;
