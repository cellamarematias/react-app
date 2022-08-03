import Home from '../home/Home';
import Example from '../example/example';
import Layout from '../layout/layout';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/" element={<Home />} />
          <Route path="example/*" element={<Example />} />
        </Routes>
      </BrowserRouter>
    );
  }


export default App;