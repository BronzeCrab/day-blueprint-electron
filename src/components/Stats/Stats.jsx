import React, { Component } from 'react';
import Navbar from '../Navbar';
import LineChart from './LineChart';
import VerticalBar from './VerticalBar';

// eslint-disable-next-line react/prefer-stateless-function
class Stats extends Component {
  render() {
    return (
      <div className="stats-charts-wrapper">
        <Navbar />
        <LineChart />
        <VerticalBar />
      </div>
    );
  }
}

export default Stats;
