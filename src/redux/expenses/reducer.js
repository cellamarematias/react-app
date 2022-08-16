import {
  ADD_EXPENSE_PENDING,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_ERROR,
  DELETE_EXPENSE_PENDING,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_ERROR,
  EDIT_EXPENSE_PENDING,
  EDIT_EXPENSE_SUCCESS,
  EDIT_EXPENSE_ERROR,
  GET_EXPENSES_PENDING,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_ERROR,
  } from './constants';

  const initialState = {
    expensesList: []
  };
  export const ExpensessReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EXPENSES_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case GET_EXPENSES_SUCCESS:
        return {
          ...state,
          expensesList: action.payload,
          isLoading: false
        };
      case GET_EXPENSES_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case ADD_EXPENSE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case ADD_EXPENSE_SUCCESS:
        return {
          ...state,
          expensesList: [action.payload, ...state.expensesList],
          isLoading: false
        };
      case ADD_EXPENSE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case DELETE_EXPENSE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case DELETE_EXPENSE_SUCCESS:
        return {
          ...state,
          expensesList: state.expensesList.filter((expense) => expense._id !== action.payload._id),
          isLoading: false
        };
      case DELETE_EXPENSE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case EDIT_EXPENSE_PENDING:
        return {
          ...state,
          isLoading: true
        };
      case EDIT_EXPENSE_SUCCESS:
        return {
          ...state,
          expensesList: state.expensesList.map((expense) =>
            expense._id === action.payload._id ? action.payload : expense
          ),
          isLoading: false
        };
      case EDIT_EXPENSE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };

      default:
        return state;
    }
  };