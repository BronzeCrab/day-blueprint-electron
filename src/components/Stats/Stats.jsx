import React, { Component } from 'react';
import Navbar from '../Navbar';
import LineChart from './LineChart';

// eslint-disable-next-line react/prefer-stateless-function
class Stats extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LineChart />
      </div>
    );
  }
}

export default Stats;
