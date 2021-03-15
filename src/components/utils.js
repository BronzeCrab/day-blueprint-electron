export const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10)
};
