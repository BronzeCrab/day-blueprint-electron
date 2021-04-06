export const mockedData = {
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
    const allTags = {};

    for (let i = 0; i < 3; i+=1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      Object.keys(storageCards.lanes[i].cards).forEach(function(key) {
        const cardArray = storageCards.lanes[i].cards[key]
        cardArray.forEach(function(cardObj) {
          cardObj.tags.forEach(function(tag) {
            if (!(tag in allTags)) {
              allTags[tag] = {"count": 1}
            }
            else {
              allTags[tag].count += 1;
            }
          })
        })
      })
    }

    Object.keys(allTags).forEach(function(tag) {
      copiedData.labels.push(tag);
      copiedData.datasets[0].data.push(allTags[tag].count);
    })

    return copiedData;
};