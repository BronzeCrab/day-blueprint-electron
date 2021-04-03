import React from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const checkStorageForCards = () => {
  const localStorageData = localStorage.getItem('boards');
  return localStorageData;
};

const data = {
  labels: [],
  datasets: [
    {
      label: 'Number of done cards per day',
      data: [],
      fill: false,
      backgroundColor: 'rgb(60, 179, 113)',
      borderColor: 'rgba(123, 239, 178, 1)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

// eslint-disable-next-line react/prefer-stateless-function
class LineChart extends React.Component {

  render() {
    const localStorageData = JSON.parse(checkStorageForCards());

    data.labels = [];
    data.datasets[0].data = [];

    Object.keys(localStorageData.lanes[2].cards).sort(function(a, b) {
        return moment(a, 'YYYY-MM-DD').toDate() - moment(b, 'YYYY-MM-DD').toDate();
    }).forEach(function(key) {
      data.labels.push(key);
      data.datasets[0].data.push(localStorageData.lanes[2].cards[key].length);
    })

    return (<Line data={data} options={options} />)
  }
}

export default LineChart

