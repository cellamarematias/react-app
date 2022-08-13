import {
    REGISTER_PENDING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SET_AUTHENTICATION,
    GET_USER_SUCCESS,
    GET_USER_ERROR
  } from 'redux/auth/constants';

  export const registerPending = () => {
    return {
      type: REGISTER_PENDING
    };
  };
  export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
  });
  export const registerError = (error) => ({
    type: REGISTER_ERROR,
    payload: error
  });
  export const loginPending = () => {
    return {
      type: LOGIN_PENDING
    };
  };
  export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
  });
  export const loginError = (error) => ({
    type: LOGIN_ERROR,
    payload: error
  });
  export const setAuthentication = (data) => ({
    type: SET_AUTHENTICATION,
    payload: data
  });

  export const getUserSuccess = (data) => ({
    type: GET_USER_SUCCESS,
    payload: data
  });

  export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload: error
  });