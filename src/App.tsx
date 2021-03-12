import React from 'react';
import './App.global.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Stats from './components/Stats/Stats';
import Navbar from './components/Navbar';
import Header from './components/Header';

const data = require('./data.json');

const Index = () => {
  return (
    <div className="App">
      <Navbar />
      <Header />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stats" component={Stats} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
}
