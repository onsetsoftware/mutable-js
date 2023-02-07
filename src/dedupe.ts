// derived from https://rajatexplains.com/in-place-deduping-an-array

/**
 * removes duplicates from an array in-place
 */
export function deduplicate<T>(arr: T[]): T[] {
  const visited = new Set();
  let back = 0;
  for(let front = 0; front < arr.length; front++) {

    if(visited.has(arr[front])) {
      continue;
    }
    visited.add(arr[front]);
    arr[back] = arr[front];
    back++;
  }
  
  arr.length = back;
  
  return arr;
}
