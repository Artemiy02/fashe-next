import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Reducer from 'reducers';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from 'actions/Authorize';
import { loadState, saveState } from 'services/localStorage';

const checkTokenExpirationMiddleware = (store: Store) => (next: any) => (action: any) => {
  if (localStorage.jwtToken) {
    // Decode token and get user info and exp
    const decoded: any = jwtDecode(localStorage.jwtToken);
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('jwtToken');
      store.dispatch(setCurrentUser({}));
    }
  }
  next(action);
};

const middleware = applyMiddleware(thunk, checkTokenExpirationMiddleware);
const persistedState = loadState();

// export const store = createStore(Reducer, persistedState, composeWithDevTools(middleware));

// store.subscribe(() => {
//   saveState({
//     cart: store.getState().cart
//   });
// });

// Check for Token
// if (localStorage.jwtToken) {
//   // Decode token and get user info and exp
//   const decoded: any = jwtDecode(localStorage.jwtToken);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
// }

export const initializeStore = (preloadedState = persistedState) => {
  return createStore(Reducer, preloadedState, composeWithDevTools(applyMiddleware()));
};
