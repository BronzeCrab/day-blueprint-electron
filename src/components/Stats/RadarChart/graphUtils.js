import { randomRgba } from '../VerticalBar/graphUtils';

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
  const allTagsByMonth = {};
  for (let i = 0; i < 3; i += 1) {
    Object.keys(storageCards.lanes[i].cards).forEach((key) => {
      const newDate = new Date(key);
      const label = newDate.toISOString().slice(0, 7);
      if (!(label in allTagsByMonth)) {
        allTagsByMonth[label] = {}
      }
      const cardArray = storageCards.lanes[i].cards[key]
      cardArray.forEach((cardObj) => {
        cardObj.tags.forEach(function (tag) {
          if (tag in allTagsByMonth[label]) {
            allTagsByMonth[label][tag] += 1;
          }
          else {
            allTagsByMonth[label][tag] = 1;
            if (copiedData.labels.indexOf(tag) === -1) {
              copiedData.labels.push(tag);
            }
          }
        });
      });
    });
  }

  Object.keys(allTagsByMonth).forEach((label) => {
    const obj = {
      label,
      data: [],
      backgroundColor: '',
      borderColor: '',
      borderWidth: 1,
    }
    copiedData.labels.forEach((tag) => {
      if (!(tag in allTagsByMonth[label])) {
        obj.data.push(0);
      }
      else {
        obj.data.push(allTagsByMonth[label][tag])
      }
    });
    const color = randomRgba();
    obj.backgroundColor = (`${color + 0.2})`);
    obj.borderColor = (`${color + 1})`);
    copiedData.datasets.push(obj);
  });
  return copiedData;
};