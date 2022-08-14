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

  export const getExpensesPending = () => {
    return {
      type: GET_EXPENSES_PENDING
    };
  };

  export const getExpensesSuccess = (expenses) => ({
    type: GET_EXPENSES_SUCCESS,
    payload: expenses
  });

  export const getExpensesError = (error) => ({
    type: GET_EXPENSES_ERROR,
    payload: error
  });

  export const addExpensesPending = () => {
    return {
      type: ADD_EXPENSE_PENDING
    };
  };

  export const addExpensesSucess = (expenses) => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: expenses
  });

  export const addExpensesError = (error) => ({
    type: ADD_EXPENSE_ERROR,
    payload: error
  });

  export const deleteexpensesPending = () => {
    return {
      type: DELETE_EXPENSE_PENDING
    };
  };

  export const deleteexpensesSuccess = (expenses) => ({
    type: DELETE_EXPENSE_SUCCESS,
    payload: expenses
  });

  export const deleteexpensesError = (error) => ({
    type: DELETE_EXPENSE_ERROR,
    payload: error
  });

  export const editexpensesPending = () => ({
    type: EDIT_EXPENSE_PENDING
  });

  export const editexpensesSuccess = (expenses) => ({
    type: EDIT_EXPENSE_SUCCESS,
    payload: expenses
  });

  export const editexpensesError = (error) => ({
    type: EDIT_EXPENSE_ERROR,
    payload: error
  });