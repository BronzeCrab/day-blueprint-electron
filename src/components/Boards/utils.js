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

export const convertDateToStr = (date) => {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};

export const handleDateExp = (date) => {
  // var ndateArr = str.toString().split(' ');
  // var Months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec';
  const str = new Date(date);
  
  let day = str.getDate();
  if(day <= 9)
    day = `0${day}`;
  let month = str.getMonth() + 1
  if(month <= 9)
    month = `0${ month}`;
  const year = str.getFullYear();
  return `${year}-${month}-${day}`;
}
