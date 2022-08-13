import {
  getCouplesPending,
  getCouplesSuccess,
  getCouplesError,
  addCouplePending,
  addCoupleSuccess,
  addCoupleError,
  deleteCouple,
  deleteCoupleSuccess,
  deleteCoupleError,
  editCouple,
  editCoupleSuccess,
  editCoupleError,
  addExpensePending,
  addExpenseSuccess,
  addExpenseError,
  } from './actions';

  export const getCouples = () => {
    return (dispatch) => {
      dispatch(getCouplesPending());
      // const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/couples`)
        .then((response) => response.json())
        .then((response) => {
          dispatch(getCouplesSuccess(response.data));
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          dispatch(getCouplesError(error.toString()));
        });
    };
  };

  export const getCoupleById = (id) => {
    return (dispatch) => {
      dispatch(getCouplesPending());
      // const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/couples/${id}`)
        .then((response) => response.json())
        .then((response) => {
          dispatch(getCouplesSuccess(response.data));
          console.log(response.data);
          return response.data;
        }).catch((error) => {
          dispatch(getCouplesError(error.toString()));
        });
    };
  }

  export const addExpense = (expense, coupleId) => {
    console.log(coupleId);
    return (dispatch) => {
      dispatch(addExpensePending ());
      const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/couples/${coupleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({
          "expense": [ {
            "description": expense[0].description,
            "date": expense[0].date,
            "amount": expense[0].amount,
            "user": expense[0].user,
            } ]
        })
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data);
          dispatch(addExpenseSuccess(response.data));
          return response.data;
        }).catch((error) => {
          dispatch(addExpenseError(error));
        }
        );
    };
  };


  // export const addCouple = (data, coupleID, userId) => {
  //   console.log(data, coupleID);
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   // console.log(user.uid);
  //   const token = sessionStorage.getItem('token');
  //   const url = `${process.env.REACT_APP_API_URL}/bills/`;
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       token
  //     },
  //     body: JSON.stringify({
  //       description: data.description,
  //       amount: data.amount,
  //       date: data.date,
  //       user: userId,
  //       coupleId: coupleID,
  //     })
  //   };
  //   return (dispatch) => {
  //     dispatch(addBillPending());
  //     return fetch(url, options)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         dispatch(addBillSuccess(response.data));
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         dispatch(addBillError(error));
  //       });
  //   };
  // };

  // export const editBill = (editedBill) => {
  //   const token = sessionStorage.getItem('token');
  //   const url = `${process.env.REACT_APP_API_URL}/bills/${editedBill.id}`;
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       token
  //     },
  //     body: JSON.stringify({
  //       description: editedBill.description,
  //       amount: editedBill.amount,
  //       date: editedBill.date,
  //     })
  //   };
  //   return (dispatch) => {
  //     dispatch(editBillPending());
  //     return fetch(url, options)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         dispatch(editBillSuccess(response.data));
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         dispatch(editBillError(error));
  //       });
  //   };
  // };

  // export const deleteBill = (id) => {
  //   const token = sessionStorage.getItem('token');
  //   return (dispatch) => {
  //     dispatch(deleteBillPending());
  //     return fetch(`${process.env.REACT_APP_API_URL}/bills/${id}`, {
  //       method: 'DELETE',
  //       headers: { token }
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         dispatch(deleteBillSuccess(response.data));
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         dispatch(deleteBillError(error.toString()));
  //       });
  // };
  // };
