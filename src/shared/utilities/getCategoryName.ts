export function getCategoryName(title: string): string {
  if (title.includes('Washer')) {
    return 'Washer Dryer';
  } else if (title.includes('Rangehood')) {
    return 'Rangehood';
  } else if (title.includes('Dishwasher')) {
    return 'Dishwasher';
  } else {
    return;
  }
}

module.exports = {
  getCategoryName,
};
