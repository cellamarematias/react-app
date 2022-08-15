import Home from '../home/Home';
import Layout from '../layout';
import Login from '../auth/Login';
import PrivateRoute from './privateRoutes';
import Signup from 'components/auth/sigunp';
import Task from 'components/tasks';
import Expenses from 'components/expenses';
import { useSelector } from 'react-redux';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


  function App() {
    const user = useSelector((state) => state.userLogged);
    //console.log(user.user.authenticated);
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
          <Route path="/tasks"
            element={
              <PrivateRoute>
                <Task />
              </PrivateRoute>
            }/>
            <Route path="/expenses"
            element={
              <PrivateRoute>
                <Expenses />
              </PrivateRoute>
            }/>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }


export default App;