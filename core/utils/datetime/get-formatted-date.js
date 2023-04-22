export const getFormattedDate = (date) => {
  const thisDate = new Date(date);
  return thisDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
  });
};
