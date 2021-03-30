export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    // eslint-disable-next react/destructuring-assignment
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10);
};

export const handleDateExp = (date) => {
  let day = date.getDate();
  if (day <= 9) {
    day = `0${day}`;
  }
  let month = date.getMonth() + 1;
  if (month <= 9) {
    month = `0${month}`;
  }
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
