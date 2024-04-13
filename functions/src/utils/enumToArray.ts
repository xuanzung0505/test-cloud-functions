export function enumToArray<T>(myEnum: any): T[] {
  const result = [];
  for (let key in myEnum) {
    result.push(myEnum[key]);
  }
  return result;
}
