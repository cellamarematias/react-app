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

  export const getbillsPending = () => {
    return {
      type: GET_BILLS_PENDING
    };
  };

  export const getBillsSuccess = (BILLSs) => ({
    type: GET_BILLS_SUCCESS,
    payload: BILLSs
  });

  export const getBillsError = (error) => ({
    type: GET_BILLS_ERROR,
    payload: error
  });

  export const addBillPending = () => {
    return {
      type: ADD_BILL_PENDING
    };
  };

  export const addBillSuccess = (BILLS) => ({
    type: ADD_BILL_SUCCESS,
    payload: BILLS
  });

  export const addBillError = (error) => ({
    type: ADD_BILL_ERROR,
    payload: error
  });

  export const deleteBillPending = () => {
    return {
      type: DELETE_BILL_PENDING
    };
  };

  export const deleteBillSuccess = (BILLSs) => ({
    type: DELETE_BILL_SUCCESS,
    payload: BILLSs
  });

  export const deleteBillError = (error) => ({
    type: DELETE_BILL_ERROR,
    payload: error
  });

  export const editBillPending = () => ({
    type: EDIT_BILL_PENDING
  });

  export const editBillSuccess = (BILLSs) => ({
    type: EDIT_BILL_SUCCESS,
    payload: BILLSs
  });

  export const editBillError = (error) => ({
    type: EDIT_BILL_ERROR,
    payload: error
  });