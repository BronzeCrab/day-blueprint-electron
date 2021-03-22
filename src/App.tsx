import React from 'react';
import './App.global.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Stats from './components/Stats/Stats';
import Navbar from './components/Navbar';
import Boards from './components/Boards/Boards';


const Index = (props) => {

  return (
    <div className="App">
      <Navbar />
      <Boards />
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
