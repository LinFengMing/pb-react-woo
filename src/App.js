import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Nav from './view/layout/nav.jsx';
import AppRouters from './view/layout/appRouters.jsx';
import './App.scss';

function App() {
  return (
  <Router>
    <Nav />
    <main className="mdc-top-app-bar--fixed-adjust">
      <AppRouters />
    </main>
  </Router>
  );
}

export default App;
