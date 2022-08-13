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
      ADD_EXPENSE_PENDING,
      ADD_EXPENSE_SUCCESS,
      ADD_EXPENSE_ERROR
  } from './constants';
  const initialState = {
    couplesList: []
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
      case ADD_EXPENSE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case ADD_EXPENSE_SUCCESS:
        return {
          ...state,
          couplesList: state.couplesList.map((couple) => {
            if (couple._id === action.payload.coupleId) {
              return {
                ...couple,
                expenses: [...couple.expenses, action.payload]
              };
            }
            return couple;
          }),
          isLoading: false
        };
      case ADD_EXPENSE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };