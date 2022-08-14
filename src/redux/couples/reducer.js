import {
      GET_COUPLES_PENDING,
      GET_COUPLES_SUCCESS,
      GET_COUPLES_ERROR,
      ADD_COUPLE_PENDING,
      ADD_COUPLE_SUCCESS,
      ADD_COUPLE_ERROR,
      DELETE_COUPLE_PENDING,
      DELETE_COUPLE_SUCCESS,
      DELETE_COUPLE_ERROR,
      EDIT_COUPLE_PENDING,
      EDIT_COUPLE_SUCCESS,
      EDIT_COUPLE_ERROR,
      USERSEARCHED_SUCCESS,
      USERSEARCHED_ERROR,
      GET_COUPLES_ID_PENDING,
      GET_COUPLES_ID_SUCCESS,
      GET_COUPLES_ID_ERROR
  } from './constants';
  const initialState = {
    usersearch: {
      email: '',
      fullName: '',
      _id: '',
      message: '',
      error: ''
    },
    couplesList: [],
    coupleSelected: [],
  };
  export const couplesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUPLES_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case GET_COUPLES_SUCCESS:
        return {
          ...state,
          couplesList: action.payload,
          coupleSelected: [action.payload[0]],
          isLoading: false
        };
      case GET_COUPLES_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case ADD_COUPLE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case ADD_COUPLE_SUCCESS:
        return {
          ...state,
          couplesList: [...state.couplesList, action.payload],
          coupleSelected: [action.payload],
          isLoading: false
        };
      case ADD_COUPLE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case DELETE_COUPLE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case DELETE_COUPLE_SUCCESS:
        return {
          ...state,
          couplesList: state.couplesList.filter((couple) => couple._id !== action.payload._id),
          isLoading: false
        };
      case DELETE_COUPLE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case EDIT_COUPLE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case EDIT_COUPLE_SUCCESS:
        return {
          ...state,
          couplesList: state.couplesList.map((couple) =>
            couple._id === action.payload._id ? action.payload : couple
          ),
          isLoading: false
        };
      case EDIT_COUPLE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case USERSEARCHED_SUCCESS:
        return {
          ...state,
          usersearch: {
            email: action.payload.email,
            fullName: action.payload.fullName,
            _id: action.payload._id,
            error: false
          },
          isLoading: false,
        };
      case USERSEARCHED_ERROR:
        return {
          ...state,
          isLoading: false,
          usersearch: {
            email: '',
            fullName: '',
            _id: '',
            message: 'User Not found - User must be registered',
            error: true
          },
        };
      case GET_COUPLES_ID_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case GET_COUPLES_ID_SUCCESS:
        return {
          ...state,
          coupleSelected: action.payload,
          isLoading: false
        };
      case GET_COUPLES_ID_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };