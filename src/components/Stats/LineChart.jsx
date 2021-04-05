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
    {
      label: 'Total number of cards per day',
      data: [],
      fill: false,
      backgroundColor: '#003366',
      borderColor: '#003366',
    }
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
    const allCards = {};
    for (let i = 0; i < 3; i+=1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      Object.keys(localStorageData.lanes[i].cards).forEach(function(key) {
        const cardArray = localStorageData.lanes[i].cards[key]
        cardArray.forEach(function(cardObj) {
          cardObj.laneId = i;
          if (key in allCards) {
            allCards[key].push(cardObj)
          }
          else {
            allCards[key] = [cardObj];
          }
        })
      })
    }

    console.log('reload');

    Object.keys(allCards).sort(function(a, b) {
        return moment(a, 'YYYY-MM-DD').toDate() - moment(b, 'YYYY-MM-DD').toDate();
    }).forEach(function(key) {
      data.labels.push(key);
      let numOfDone = 0;
      let totalPerDay = 0;
      allCards[key].forEach(function(cardObj) {
        if (cardObj.laneId === 2) {
          numOfDone += 1;
        }
        totalPerDay += 1;
      });
      data.datasets[0].data.push(numOfDone);
      data.datasets[1].data.push(totalPerDay);
    });

    return (<Line data={data} options={options} />)
  }
}

export default LineChart

