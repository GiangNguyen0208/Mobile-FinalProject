import React from 'react';
import routes from './routes';
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {routes.children.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}/>
        ))}
      </Routes>
    </Router>

  );
}

export default App;
