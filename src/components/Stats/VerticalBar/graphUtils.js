export const mockedData = {
  labels: [],
  datasets: [
    {
      label: 'Number of cards with specific tag',
      data: [],
      backgroundColor: [

      ],
      borderColor: [

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
}

function randomRgba() {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    return `rgba(${  o(r()*s)  },${  o(r()*s)  },${  o(r()*s)  },`;
}

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
      const color = randomRgba();
      copiedData.datasets[0].backgroundColor.push(`${color + 0.2  })`);
      copiedData.datasets[0].borderColor.push(`${color + 1  })`);
    })

    return copiedData;
};