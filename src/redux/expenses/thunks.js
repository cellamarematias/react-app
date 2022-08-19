import {
    getExpensesPending,
    getExpensesSuccess,
    getExpensesError,
    addExpensesPending,
    addExpensesSucess,
    addExpensesError,
    deleteexpensesPending,
    deleteexpensesSuccess,
    deleteexpensesError,
    editexpensesPending,
    editexpensesSuccess,
    editexpensesError
  } from './actions';

  export const getExpenses = (coupleId) => {
    return (dispatch) => {
      dispatch(getExpensesPending());
      const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/expenses/byCouple/${coupleId}`, { headers: { token } })
        .then((response) => response.json())
        .then((response) => {
          dispatch(getExpensesSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(getExpensesError(error.toString()));
        });
    };
  };

  export const addExpenses = (data) => {
    const token = sessionStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/expenses/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        coupleId: data.coupleId,
        userId: data.userId,
        amount: data.amount,
        name: data.name,
        date: data.date,
      })
    };
    return (dispatch) => {
      dispatch(addExpensesPending());
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          dispatch(addExpensesSucess(response.data));
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          dispatch(addExpensesError(error));
        });
    };
  };

  export const editExpenses = (editedExpense) => {
    const url = `${process.env.REACT_APP_API_URL}/expenses/${editedExpense.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coupleId: editedExpense.coupleId,
        userId: editedExpense.userId,
        amount: editedExpense.amount,
        name: editedExpense.name,
        date: editedExpense.date,
      })
    };
    return (dispatch) => {
      dispatch(editexpensesPending());
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          dispatch(editexpensesSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(editexpensesError(error));
        });
    };
  };

  export const deleteExpenses = ({id}) => {
    return (dispatch) => {
      dispatch(deleteexpensesPending());
      return fetch(`${process.env.REACT_APP_API_URL}/expenses/${id}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(deleteexpensesSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(deleteexpensesError(error.toString()));
        });
    };
  };
