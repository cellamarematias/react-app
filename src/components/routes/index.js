import Layout from '../layout';
import Login from '../auth/Login';
import PrivateRoute from './privateRoutes';
import Signup from 'components/auth/sigunp';
import Task from 'components/tasks';
import Expenses from 'components/expenses';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


  function App() {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }


export default App;