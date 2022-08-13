import {
    getbillsPending,
    getBillsSuccess,
    getBillsError,
    addBillPending,
    addBillSuccess,
    addBillError,
    deleteBillPending,
    deleteBillSuccess,
    deleteBillError,
    editBillPending,
    editBillSuccess,
    editBillError
  } from './actions';
  import firebaseApp from 'helper';
  import { getAuth } from "firebase/auth";

  export const getBills = () => {
    return (dispatch) => {
      dispatch(getbillsPending());
      // const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/bills`)
        .then((response) => response.json())
        .then((response) => {
          dispatch(getBillsSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(getBillsError(error.toString()));
        });
    };
  };

  export const addBill = (data, coupleID, userId) => {
    console.log(data, coupleID);
    const auth = getAuth();
    const user = auth.currentUser;
    // console.log(user.uid);
    const token = sessionStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/bills/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: data.description,
        amount: data.amount,
        date: data.date,
        user: userId,
        coupleId: coupleID,
      })
    };
    return (dispatch) => {
      dispatch(addBillPending());
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          dispatch(addBillSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(addBillError(error));
        });
    };
  };

  export const editBill = (editedBill) => {
    const token = sessionStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/bills/${editedBill.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: editedBill.description,
        amount: editedBill.amount,
        date: editedBill.date,
      })
    };
    return (dispatch) => {
      dispatch(editBillPending());
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          dispatch(editBillSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(editBillError(error));
        });
    };
  };

  export const deleteBill = (id) => {
    const token = sessionStorage.getItem('token');
    return (dispatch) => {
      dispatch(deleteBillPending());
      return fetch(`${process.env.REACT_APP_API_URL}/bills/${id}`, {
        method: 'DELETE',
        headers: { token }
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(deleteBillSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(deleteBillError(error.toString()));
        });
    };
  };
