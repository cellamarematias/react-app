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

  export const getCouplesPending = () => {
    return {
      type: GET_COUPLES_PENDING
    };
  };

  export const getCouplesSuccess = (COUPLES) => ({
    type: GET_COUPLES_SUCCESS,
    payload: COUPLES
  });

  export const getCouplesError = (error) => ({
    type: GET_COUPLES_ERROR,
    payload: error
  });

  export const addCouplePending = () => {
    return {
      type: ADD_COUPLE_PENDING
    };
  };

  export const addCoupleSuccess = (COUPLES) => ({
    type: ADD_COUPLE_SUCCESS,
    payload: COUPLES
  });

  export const addCoupleError = (error) => ({
    type: ADD_COUPLE_ERROR,
    payload: error
  });

  export const deleteCouplePending = () => {
    return {
      type: DELETE_COUPLE_PENDING
    };
  };

  export const deleteCoupleSuccess = (COUPLES) => ({
    type: DELETE_COUPLE_SUCCESS,
    payload: COUPLES
  });

  export const deleteCoupleError = (error) => ({
    type: DELETE_COUPLE_ERROR,
    payload: error
  });

  export const editCouplePending = () => ({
    type: EDIT_COUPLE_PENDING
  });

  export const editCoupleSuccess = (COUPLES) => ({
    type: EDIT_COUPLE_SUCCESS,
    payload: COUPLES
  });

  export const editCoupleError = (error) => ({
    type: EDIT_COUPLE_ERROR,
    payload: error
  });

  export const userSearchedSuccess = (COUPLES) => ({
    type: USERSEARCHED_SUCCESS,
    payload: COUPLES
  });

  export const userSearchedError = (error) => ({
    type: USERSEARCHED_ERROR,
    payload: error
  });

  export const getCouplesIdPending = () => ({
    type: GET_COUPLES_ID_PENDING
  });

  export const getCouplesIdSuccess = (COUPLES) => ({
    type: GET_COUPLES_ID_SUCCESS,
    payload: COUPLES
  });

  export const getCouplesIdError = (error) => ({
    type: GET_COUPLES_ID_ERROR,
    payload: error
  });



