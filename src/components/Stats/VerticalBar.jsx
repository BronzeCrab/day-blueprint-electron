import React from 'react'
import { Bar } from 'react-chartjs-2';

const checkStorageForCards = () => {
  const localStorageData = localStorage.getItem('boards');
  return localStorageData;
};

const data = {
  labels: [],
  datasets: [
    {
      label: 'Number of cards with specific tag',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
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
class VerticalBar extends React.Component {

  render() {
    const localStorageData = JSON.parse(checkStorageForCards());

    data.labels = [];
    data.datasets[0].data = [];
    const allTags = {};

    for (let i = 0; i < 3; i+=1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      Object.keys(localStorageData.lanes[i].cards).forEach(function(key) {
        const cardArray = localStorageData.lanes[i].cards[key]
        cardArray.forEach(function(cardObj) {
          cardObj.tags.forEach(function(tag) {
            if (!(tag in allTags)) {
              allTags[tag] = {"count": 0}
            }
          })
        })
      })
    }

    for (let i = 0; i < 3; i+=1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      Object.keys(localStorageData.lanes[i].cards).forEach(function(key) {
        const cardArray = localStorageData.lanes[i].cards[key]
        cardArray.forEach(function(cardObj) {
          cardObj.tags.forEach(function(tag) {
            allTags[tag].count += 1;
          })
        })
      })
    }

    Object.keys(allTags).forEach(function(tag) {
      data.labels.push(tag);
      data.datasets[0].data.push(allTags[tag].count);
    })

    return (<Bar data={data} options={options} />)
  }
}

export default VerticalBar