const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i)[0].split(",").map((i) =>
  parseInt(i)
);

console.log(calculate(array, 80));
console.log(calculate(array, 256));

function calculate(array, days) {
  const fishes = Array(9).fill(0);
  for (const reamingDays of array) {
    fishes[reamingDays]++;
  }
  for (let day = 0; day < days; day++) {
    const x = fishes.shift();
    fishes[6] += x;
    fishes[8] = x;
  }
  return fishes.reduce((a, b) => a + b);
}
