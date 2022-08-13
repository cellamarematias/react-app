import {
    GET_BILLS_PENDING,
    GET_BILLS_SUCCESS,
    GET_BILLS_ERROR,
    ADD_BILL_PENDING,
    ADD_BILL_SUCCESS,
    ADD_BILL_ERROR,
    DELETE_BILL_PENDING,
    DELETE_BILL_SUCCESS,
    DELETE_BILL_ERROR,
    EDIT_BILL_PENDING,
    EDIT_BILL_SUCCESS,
    EDIT_BILL_ERROR
  } from './constants';
  const initialState = {
    billsList: []
  };
  export const billsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BILLS_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case GET_BILLS_SUCCESS:
        return {
          ...state,
          billsList: action.payload,
          isLoading: false
        };
      case GET_BILLS_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case ADD_BILL_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case ADD_BILL_SUCCESS:
        return {
          ...state,
          billsList: [...state.billsList, action.payload],
          isLoading: false
        };
      case ADD_BILL_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case DELETE_BILL_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case DELETE_BILL_SUCCESS:
        return {
          ...state,
          billsList: state.billsList.filter((BILL) => BILL._id !== action.payload._id),
          isLoading: false
        };
      case DELETE_BILL_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case EDIT_BILL_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case EDIT_BILL_SUCCESS:
        return {
          ...state,
          billsList: state.billsList.map((BILL) =>
            BILL._id === action.payload._id ? action.payload : BILL
          ),
          isLoading: false
        };
      case EDIT_BILL_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };