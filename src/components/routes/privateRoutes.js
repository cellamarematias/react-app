import Home from 'components/home/Home';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate   } from 'react-router-dom';

function PrivateRoute({ children }) {
    const user = useSelector((state) => state.userLogged);
    const authenticated = user.user.authenticated;
    let navigate = useNavigate();
    return authenticated ? children : <Home/>;
  }

export default PrivateRoute;