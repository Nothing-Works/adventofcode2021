const string = await Deno.readTextFile("./input.txt");

let array = string.split(/[\r\n]+/).filter((i) => i).map((i) => i.split(""))
  .map((i) => i.map(Number));

const flash = {};
for (let index = 1; index <= 1000; index++) {
  flash[index] = [];
}

// for (let index = 1; index <= 100; index++) {
//     go(array,index)
// }
let total = 0;
for (const key in flash) {
  total += flash[key].length;
}

console.log(total);
console.log(array);
let times = 1;
while (!array.every((i) => i.every((j) => j === 0))) {
  go(array, times);
  times++;
}
console.log(times);

function getAdjancent(row, column) {
  const result = [];
  for (let j = row - 1; j <= row + 1; j++) {
    for (let i = column - 1; i <= column + 1; i++) {
      if (i >= 0 && j >= 0 && i < 10 && j < 10 && !(j == row && i == column)) {
        result.push([j, i]);
      }
    }
  }
  return result;
}

function greatthannine() {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const cube = array[i];
    for (let j = 0; j < cube.length; j++) {
      if (array[i][j] > 9) {
        result.push([i, j]);
      }
    }
  }
  return result;
}
function go(arr, index) {
  //increase one
  for (let i = 0; i < arr.length; i++) {
    const cube = arr[i];
    for (let j = 0; j < cube.length; j++) {
      arr[i][j] += 1;
    }
  }

  //two
  for (let i = 0; i < arr.length; i++) {
    const cube = arr[i];
    for (let j = 0; j < cube.length; j++) {
      if (arr[i][j] > 9) {
        flash[index].push([i, j]);
        for (const iterator of getAdjancent(i, j)) {
          arr[iterator[0]][iterator[1]] += 1;
        }
      }
    }
  }

  while (
    greatthannine().filter((i) => {
      let contains = false;
      for (const iterator of flash[index]) {
        if (i[0] === iterator[0] && i[1] === iterator[1]) {
          contains = true;
          break;
        }
      }
      return !contains;
    }).length !== 0
  ) {
    let remaining = greatthannine().filter((i) => {
      let contains = false;
      for (const iterator of flash[index]) {
        if (i[0] === iterator[0] && i[1] === iterator[1]) {
          contains = true;
          break;
        }
      }
      return !contains;
    });
    for (const iterator of remaining) {
      flash[index].push([iterator[0], iterator[1]]);
      for (const el of getAdjancent(iterator[0], iterator[1])) {
        arr[el[0]][el[1]] += 1;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    const cube = arr[i];
    for (let j = 0; j < cube.length; j++) {
      if (arr[i][j] > 9) {
        arr[i][j] = 0;
      }
    }
  }
}
