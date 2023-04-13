export const getFormattedDate = (date) =>
  date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
  });
