export function clearHTML(text: string): string {
  return text.replace(/<[^>]+>/g, '');
}

// TODO: remove when remix will support typescript 5.4
// @ts-ignore
export function groupBy(array, key) {
  // @ts-ignore
  return array.reduce((acc, value) => {
    const keyValue = value[key];
    (acc[keyValue] = acc[keyValue] || []).push(value);
    return acc;
  }, {});
};

export function convertToDashed(value: string): string {
  return value.split(' ').reduce((previous, current, index) => {
    const clearedValue = current.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase();

    return index > 0 ? `${previous}-${clearedValue}` : clearedValue;
  }, '');
}