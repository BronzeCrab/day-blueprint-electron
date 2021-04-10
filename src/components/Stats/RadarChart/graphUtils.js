import { randomRgba } from '../VerticalBar/graphUtils';

export const mockedData = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor:'',
      borderColor: '',
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

  const color = randomRgba();
  copiedData.datasets[0].backgroundColor = color + 0.2 + ')';
  copiedData.datasets[0].borderColor = color + 1 + ')';
  return copiedData;
};