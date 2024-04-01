export function clearHTML(text : string) {
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