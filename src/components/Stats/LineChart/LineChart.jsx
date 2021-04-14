/* eslint-disable no-console */
import React from 'react'
import { Line } from 'react-chartjs-2';

import { asyncLocalStorage } from '../../Boards/utils';
import {
  mockedData,
  options,
  getFormatedData,
} from './graphUtils';

class LineChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

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

    return (<Line data={data} options={options} />);
  }
}

export default LineChart

