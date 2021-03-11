import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import Navbar from '../Navbar';
import '../../App.global.css';

// eslint-disable-next-line react/prefer-stateless-function
class Stats extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Stats;
