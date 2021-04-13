import { randomRgba } from '../VerticalBar/graphUtils';

export const mockedData = {
  labels: ['To do', 'Doing', 'Done'],
  datasets: [
    {
      label: 'Number of cards with specific status',
      data: [0, 0, 0],
      backgroundColor: [
      ],
      borderColor: [
      ],
      borderWidth: 1,
    },
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
        copiedData.datasets[0].data[i] += 1;
      });
    });
    const color = randomRgba();
    copiedData.datasets[0].backgroundColor.push(`${color + 0.2  })`);
    copiedData.datasets[0].borderColor.push(`${color + 1  })`);
  };

  return copiedData;
};