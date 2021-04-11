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
    const allTags = {};
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
        cardObj.tags.forEach(function(tag) {
          if (tag in allTags) {
            allTags[tag] += 1;
          }
          else {
            allTags[tag] = 1;
          };
        });
      });
    });
  }

  let currMonth;
  let obj;

  Object.keys(allCards)
    .sort((a, b) => moment(a, dateFormat).toDate() - moment(b, dateFormat).toDate())
    .forEach((key) => {
        const newDate = new Date(key);
        const label = newDate.toISOString().slice(0, 7);
        const newMonth = newDate.getMonth();
        if (currMonth === undefined || currMonth === newMonth) {
          currMonth = newMonth;
          obj = {
            label: label, 
            data: [],
            backgroundColor:'',
            borderColor: '',
            borderWidth: 1,
          }
          allCards[key].forEach((cardObj) => {
            cardObj.tags.forEach((tag) => {
              if (copiedData.labels.indexOf(tag) === -1) {
                copiedData.labels.push(tag);
                obj.data.push(allTags[tag])
              }
            });
          });
          const color = randomRgba();
          obj.backgroundColor = color + 0.2 + ')';
          obj.borderColor = color + 1 + ')';
        }
        else {

        }
        copiedData.datasets.push(obj)
    });

  return copiedData;
};