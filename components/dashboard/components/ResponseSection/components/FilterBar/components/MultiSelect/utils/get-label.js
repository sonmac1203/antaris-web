export const getLabel = (amount, type) => {
  const plural = amount === 1 ? '' : 's';
  const label = `${amount} ${type}${plural} selected`;
  return label;
};
