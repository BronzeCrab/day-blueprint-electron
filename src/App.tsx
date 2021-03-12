import React from 'react';
import Board from 'react-trello';
import './App.global.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stats from './components/Stats/Stats';
import Header from './components/Header';

const data = require('./data.json');

const Index = () => {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Board data={data} draggable editable />
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
