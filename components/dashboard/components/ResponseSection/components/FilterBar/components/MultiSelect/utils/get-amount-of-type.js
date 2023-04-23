export const getAmountOfType = (arr, type) => {
  const amount = arr.filter((obj) => obj.type === type).length;
  return amount;
};
