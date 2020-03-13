import jwtDecode from 'jwt-decode';
import ApiService from 'services/ApiService';
import { Dispatch } from 'redux';
import { IUser } from 'types/Login';
import { setToast } from 'reducers/toast';
import { getErrors } from 'reducers/Errors';
import { setCurrentUser } from 'reducers/Authorize';
import { AuthToken } from 'services/auth_token';
import Router from 'next/router';
import initPathSelector from 'selectors/initPath';
import { AppState } from 'reducers';

// Register user
export const registerUser = (userData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await ApiService.post('/users/register', userData);
    const data = await res.json();
    if (!res.ok) {
      return dispatch(getErrors(data));
    }
    dispatch(
      setToast({ type: 'success', message: 'User was successfully created!' })
    );
    Router.push('/login');
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};

// Login - Get User Token
export const loginUser = (userData: IUser) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    const res = await ApiService.post('/users/login', userData);
    const token = res.headers.get('x-auth-token');

    const data = await res.json();

    if (!res.ok) {
      dispatch(setToast({ type: 'error', message: data.login }));
      return dispatch(getErrors(data));
    }
    const path = initPathSelector(getState()) || '/';
    if (token) {
      // Set token to localStorage
      await AuthToken.storeToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
      Router.push(path);

      return dispatch(setToast({ type: 'success', message: 'Login success!' }));
    }
    dispatch(setToast({ type: 'error', message: 'Something went wrong!' }));
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};

// Login by socials
export const socialLoginUser = (user: any, type: string) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    const res = await ApiService.post(`/users/auth/${type}`, user);
    const token = res.headers.get('x-auth-token');

    const data = await res.json();
    if (!res.ok) {
      dispatch(setToast({ type: 'error', message: data.login }));
      return dispatch(getErrors(data));
    }
    const path = initPathSelector(getState()) || '/';
    if (token) {
      // Set token to localStorage
      await AuthToken.storeToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
      Router.push(path);

      return dispatch(setToast({ type: 'success', message: 'Login success!' }));
    }
    dispatch(setToast({ type: 'error', message: 'Something went wrong!' }));
  } catch (err) {
    dispatch(setToast({ type: 'error', message: err.message }));
  }
};

// Log user out
export const logoutUser = () => (dispatch: Dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
