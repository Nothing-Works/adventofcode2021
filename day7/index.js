const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i)[0].split(",").map((i) =>
  parseInt(i)
);

const result1 = [];
const result2 = [];

for (let index = Math.min(...array); index <= Math.max(...array); index++) {
  let steps1 = 0;
  let steps2 = 0;
  for (const iterator of array) {
    const abs = Math.abs(iterator - index);
    //part1
    const total1 = abs;
    //part2
    const total2 = abs + abs * (abs - 1) / 2;
    steps1 += total1;
    steps2 += total2;
  }
  result1.push(steps1);
  result2.push(steps2);
}

console.log(Math.min(...result1));
console.log(Math.min(...result2));
