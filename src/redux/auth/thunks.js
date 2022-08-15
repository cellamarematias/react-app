import {
    setAuthentication,
    registerError,
    registerSuccess,
    registerPending,
    editUserPending,
    editUserSuccess,
    editUserError,
  } from './actions';
  // eslint-disable-next-line no-unused-vars
  import firebaseApp from 'helper';

  export const setAuth = (displayName, email, token, uid) => {
    return (dispatch) => {
      dispatch(setAuthentication({ authenticated: true, displayName, email, token, uid }));
    }
  }

  export const createUser = (userUid, fullName, email) => {
    const token = sessionStorage.getItem('token');
    console.log(userUid, fullName, email);
    const url = `${process.env.REACT_APP_API_URL}/users/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: userUid,
        fullName: fullName,
        email: email,
      })
    };
    return (dispatch) => {
      dispatch(registerPending());
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          dispatch(registerSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(registerError(error));
        });
    };
  };

  export const getUser = (uid, fullName, email) => {
    const token = sessionStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/users/${uid}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return (dispatch) => {
      return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.error === true) {
            dispatch(createUser(uid, fullName, email));
          }
          // dispatch(getUserSuccess(response.data));
          return response.data;
        }).catch((error) => {
          //dispatch(getUserError(error));
        }
        );
    }
  }
