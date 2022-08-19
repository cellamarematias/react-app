import {
  getCouplesPending,
  getCouplesSuccess,
  getCouplesError,
  addCouplePending,
  addCoupleSuccess,
  addCoupleError,
  userSearchedSuccess,
  userSearchedError,
  getCouplesIdPending,
  getCouplesIdSuccess,
  getCouplesIdError,
  } from './actions';

  export const getCouples = (userOne) => {
    return (dispatch) => {
      dispatch(getCouplesPending());
      const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/couples/${userOne}`, { headers: { token } })
        .then((response) => response.json())
        .then((response) => {
          dispatch(getCouplesSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(getCouplesError(error.toString()));
        });
    };
  };

  export const getCoupleById = (id) => {
    return (dispatch) => {
      dispatch(getCouplesIdPending());
      const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/couples/byId/${id}`, { headers: { token } })
        .then((response) => response.json())
        .then((response) => {
          dispatch(getCouplesIdSuccess(response.data));
          return response.data;
        }).catch((error) => {
          dispatch(getCouplesIdError(error.toString()));
        });
    };
  }

  export const findUserByEmail = (email) => {
    const token = sessionStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/users/email/${email}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
      }
    };
    return (dispatch) => {
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.error === true) {
            dispatch(userSearchedError(response.error));
          } else {
          dispatch(userSearchedSuccess(response.data));
          return response.data;
          }
        }).catch((error) => {
          dispatch(userSearchedError(error));
        }
        );
    }
  }

  export const addCoupleThunks = (couple) => {
    return (dispatch) => {
      dispatch(addCouplePending());
      const token = sessionStorage.getItem('token');
      return fetch(`${process.env.REACT_APP_API_URL}/couples`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({
          "name": couple.name,
          "userOne": couple.userOne,
          "userTwo": couple.userTwo,
        })
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(addCoupleSuccess(response.data));
          dispatch(getCouples(couple.userOne));
          return response.data;
        }).catch((error) => {
          dispatch(addCoupleError(error));
        }
        );
    };
  }

