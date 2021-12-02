const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i).map((i) => parseInt(i));

// part 1
console.log(homManyMeasurements(array));

// part 2
const size = 3;
const slidingArray = array.map((_, i) => array.slice(i, i + size))
  .filter((i) => i.length === size)
  .map((i) => i.reduce((a, b) => a + b));

console.log(homManyMeasurements(slidingArray));

function homManyMeasurements(arr) {
  let count = 0;

  arr.reduce((pre, cur) => {
    if (cur - pre > 0) {
      count++;
    }
    return cur;
  });

  return count;
}
