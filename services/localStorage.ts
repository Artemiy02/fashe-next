import { cartState } from 'reducers/cart';

interface ILocalStorage {
  cart: cartState;
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: ILocalStorage) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};
