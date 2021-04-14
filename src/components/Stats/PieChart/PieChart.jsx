/* eslint-disable no-console */
import React from 'react'
import { Pie } from 'react-chartjs-2';

import { asyncLocalStorage } from '../../Boards/utils';
import {
  mockedData,
  getFormatedData,
} from './graphUtils';

// eslint-disable-next-line react/prefer-stateless-function
class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  };

  componentDidMount() {
    this.fetchDataFromStorage();
  };

  fetchDataFromStorage = async () => {
    try {
      const storageCards = JSON.parse(await asyncLocalStorage.getItem('boards'));
      const graphData = JSON.parse(JSON.stringify(mockedData));
      const formatedData = getFormatedData(storageCards, graphData);

      this.setState({ data: formatedData });

    } catch (err) {
      console.error(err);
    }
  };


  render() {
    const { data } = this.state;

    if (!data)
      return null;

    return (<Pie data={data} />);
  }
};

export default PieChart;