import Task from 'components/tasks';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate  } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
    // const authenticated = useSelector((state) => state.userLogged.user.authenticated);

    // return (
    //     authenticated ? Task : ( <Navigate to="/login" /> )
    // );
};

export default PrivateRoute;