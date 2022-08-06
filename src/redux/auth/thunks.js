import {
    setAuthentication
  } from './actions';

  export const setAuth = (displayName, email) => {
    return (dispatch) => {
      dispatch(setAuthentication({ authenticated: true, displayName, email}));
    }
  }