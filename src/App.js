import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Nav from './view/layout/nav.jsx';
import HomePage from './view/home/homePage.jsx';
import './App.scss';

function App() {
  return (
  <Router>
    <Nav />
    <main className="mdc-top-app-bar--fixed-adjust">
      <div className="App">
        <HomePage />
      </div>
    </main>
  </Router>
  );
}

export default App;
