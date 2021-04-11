import moment from 'moment';
import { randomRgba } from '../VerticalBar/graphUtils';

const dateFormat = 'YYYY-MM-DD'; 

export const mockedData = {
  labels: [],
  datasets: [

  ],
}

export const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
}

export const getFormatedData = (storageCards, copiedData) => {
    const allCards = {};
    for (let i = 0; i < 3; i+=1) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    Object.keys(storageCards.lanes[i].cards).forEach(function(key) {
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
    })
  }

  let currMonth;
  let obj;

  Object.keys(allCards)
    .sort((a, b) => moment(a, dateFormat).toDate() - moment(b, dateFormat).toDate())
    .forEach((key) => {
        const newDate = new Date(key).getMonth();
        if (currMonth === undefined || currMonth === newDate) {
          currMonth = newDate;
          obj = {
            label: currMonth, 
            data: [],
            backgroundColor:'',
            borderColor: '',
            borderWidth: 1,
          }
          for (let j = 0; j < allCards[key].length; j+=1) {
            const cardObj = allCards[j];
            cardObj.tags.forEach((tag) => {
              if (cardObj.tags.indexOf(tag) === -1) {
                copiedData.labels.push(tag);
                obj.data.push(1)
              }
              else {
                obj.data[j] += 1
              }
            });
          };
          obj.data = [1, 2, 3]
          const color = randomRgba();
          obj.backgroundColor = color + 0.2 + ')';
          obj.borderColor = color + 1 + ')';
        }
        else {
          currMonth = newDate;
          copiedData.datasets.push(obj)
        }

        copiedData.datasets.push(obj)
    });

  return copiedData;
};