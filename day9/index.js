const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i).map((i) => i.split(""));

const heightMap = string
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((point) => point < 9)
  );

// part1
console.log(
  array.map((e, i) => {
    return e.map((el, index) => {
      const all = findAdjacent(array, i, index);
      return [parseInt(el), all.map((i) => parseInt(i))];
    });
  }).map((i) => {
    return i.map((j) => {
      const min = Math.min(...j[1]);
      if (j[0] < min) {
        return j[0];
      }
    });
  }).map((i) => i.filter((j) => j !== undefined)).filter((i) => i.length !== 0)
    .flat().map((i) => i + 1).reduce((a, b) => a + b),
);

//part 2
const width = heightMap[0].length;
const height = heightMap.length;
const basins = [];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (!heightMap[y][x]) {
      continue;
    }

    const queue = [];

    let size = 0;

    queue.push([x, y]);

    while (queue.length) {
      const [x, y] = queue.pop();

      if (!heightMap[y][x]) {
        continue;
      }

      size++;
      heightMap[y][x] = false;

      x - 1 >= 0 && heightMap[y][x - 1] && queue.push([x - 1, y]);
      x + 1 < width && heightMap[y][x + 1] && queue.push([x + 1, y]);
      y - 1 >= 0 && heightMap[y - 1][x] && queue.push([x, y - 1]);
      y + 1 < height && heightMap[y + 1][x] && queue.push([x, y + 1]);
    }

    basins.push(size);
  }
}
console.log(
  basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, basin) => total * basin, 1),
);

function findAdjacent(arr, row, column) {
  const result = [];
  for (let j = row - 1; j <= row + 1; j++) {
    for (let i = column - 1; i <= column + 1; i++) {
      if (
        i >= 0 && j >= 0 && i < array[0].length && j < array.length &&
        !(j == row && i == column) && (j == row || i == column)
      ) {
        result.push(arr[j][i]);
      }
    }
  }
  return result;
}
