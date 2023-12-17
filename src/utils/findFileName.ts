export function findFilename(url: string) {
  const arr = url.split('/');
  const arrLength = arr.length;
  return arr[arrLength - 1];
}
