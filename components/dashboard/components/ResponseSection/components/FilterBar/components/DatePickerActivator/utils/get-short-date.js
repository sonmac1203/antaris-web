export function getShortDate(input, type) {
  if (!input) {
    return null;
  }
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: !type ? '2-digit' : 'numeric',
  });
}
