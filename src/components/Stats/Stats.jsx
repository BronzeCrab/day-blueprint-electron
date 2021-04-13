import React, { Component } from 'react';
import Navbar from '../Navbar';
import LineChart from './LineChart/LineChart';
import VerticalBar from './VerticalBar/VerticalBar';
import RadarChart from './RadarChart/RadarChart';
import PieChart from './PieChart/PieChart';

// eslint-disable-next-line react/prefer-stateless-function
class Stats extends Component {
  render() {
    return (
      <div className="stats-charts-wrapper">
        <Navbar />
        <h3 className="chart-header">Number of done and all cards by days</h3>
        <LineChart />
        <h3 className="chart-header">Number of cards with specific tag</h3>
        <VerticalBar />
        <h3 className="chart-header">Number of cards with specific tag by months</h3>
        <RadarChart />
        <h3 className="chart-header">Number of cards with specific status (do, doing or done)</h3>
        <PieChart />
      </div>
    );
  }
}

export default Stats;
