import Home from '../home/Home';
import Layout from '../layout';
import Login from '../auth/Login';
import Tasks from 'components/tasks';

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
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }


export default App;