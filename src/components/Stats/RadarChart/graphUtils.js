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

    for (let i = 0; i < 3; i+=1) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    Object.keys(storageCards.lanes[i].cards).forEach(function(key) {
      const cardArray = storageCards.lanes[i].cards[key]
      cardArray.forEach(function(cardObj) {

      })
    })
  }

  const obj = {
    label: 'month',
    data: [],
    backgroundColor:'',
    borderColor: '',
    borderWidth: 1,
  }

  copiedData.labels = ['tag1', 'tag2', 'tag3']
  obj.data = [1, 2, 3]
  const color = randomRgba();
  obj.backgroundColor = color + 0.2 + ')';
  obj.borderColor = color + 1 + ')';

  copiedData.datasets.push(obj)
  return copiedData;
};