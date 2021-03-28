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

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i+=1) {
    result.push(creator(i));
  }
  return result;
};

export const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10);
};

export const convertDateToStr = (date) => {
  return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
};

export const addZero = (str) => str.replace(/(^|\D)(\d)(?!\d)/g, '$10$2')
