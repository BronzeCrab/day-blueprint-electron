import moment from 'moment';

const dateFormat = 'YYYY-MM-DD'; 

export const mockedData = {
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
};

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
            beginAtZero: true,
        },
      },
    ],
  },
};

export const getFormatedData = (storageCards, copiedData) => {
  copiedData.labels = [];
  copiedData.datasets[0].data = [];
  const allCards = {};
  for (let i = 0; i < 3; i += 1) {
    Object.keys(storageCards.lanes[i].cards)
      .forEach((key) => {
        const cardArray = storageCards.lanes[i].cards[key]
        cardArray.forEach((cardObj) => {
            cardObj.laneId = i;
            if (key in allCards) {
                allCards[key].push(cardObj);
            }
            else {
                allCards[key] = [cardObj];
            }

        });
      });
    }
    Object.keys(allCards)
      .sort((a, b) => moment(a, dateFormat).toDate() - moment(b, dateFormat).toDate())
      .forEach((key) => {
          copiedData.labels.push(key);
          let numOfDone = 0;
          const totalPerDay = allCards[key].length;
          allCards[key].forEach((cardObj) => {
              if (cardObj.laneId === 2) {
                  numOfDone += 1;
              }
          });
          copiedData.datasets[0].data.push(numOfDone);
          copiedData.datasets[1].data.push(totalPerDay);
      });

    return copiedData;
};