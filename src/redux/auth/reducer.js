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

  // this state is being used in the header component
  const authenticatedState = sessionStorage.getItem('token') ? true : false;
  const initialState = {
    isLoading: false,
    user: {
      displayName: sessionStorage.getItem('displayName'),
      email: sessionStorage.getItem('email'),
      authenticated: authenticatedState,
      token: sessionStorage.getItem('token'),
      uid: sessionStorage.getItem('uid'),
      couples: [sessionStorage.getItem('couples')]
    },
    error: ''
  };

  export const logReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_PENDING:
        return {
          ...state,
          isLoading: true,
          error: initialState.error
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          authenticated: true,
          error: action.payload
        };
      case REGISTER_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case LOGIN_PENDING:
        return {
          ...state,
          isLoading: true,
          error: initialState.error
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          authenticated: true
        };
      case LOGIN_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case SET_AUTHENTICATION: {
        return {
          ...state,
          user: action.payload,
          isFetching: false
        };
      }
      case GET_USER_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          isFetching: false
        };
      }
      case GET_USER_ERROR: {
        return {
          ...state,
          error: action.payload,
          isFetching: false
        };
      }
      default:
        return state;
    }
  };