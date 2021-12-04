const string = await Deno.readTextFile("./input.txt");
const array = string.split(/[\r\n]+/).filter((i) => i);
const input = array[0].split(",");

array.shift();

let processedResult = processArray();

let position1 = null;
let position2 = null;
let whoWin1 = null;
let whoWin2 = null;

// part 1
for (let index = 0; index < input.length; index++) {
  processedResult = processedResult.map(markValue(input[index]));
  const rowAndColumn = combineRowAndColumn(processedResult);

  const winningStatus = checkWinningStatus(rowAndColumn);

  const win = winningStatus.some((i) => i);

  if (win) {
    whoWin1 = winningStatus.indexOf(true);
    position1 = input[index];
    break;
  }
}
console.log(calculate(processedResult[whoWin1], position1));

// part 2
for (let index = 0; index < input.length; index++) {
  processedResult = processedResult.map(markValue(input[index]));
  const rowAndColumn = combineRowAndColumn(processedResult);

  const winningStatus = checkWinningStatus(rowAndColumn);

  const win = winningStatus.every((i) => i);

  if (winningStatus.filter((i) => !i).length === 1) {
    whoWin2 = winningStatus.indexOf(false);
  }

  if (win) {
    position2 = input[index];
    break;
  }
}
console.log(calculate(processedResult[whoWin2], position2));

function checkWinningStatus(arr) {
  return arr.map((i) => i.some((j) => j.every((e) => e === null)));
}

function calculate(arr, position) {
  const final = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    for (let j = 0; j < item.length; j++) {
      final.push(arr[i][j]);
    }
  }
  return final.filter((i) => i).map((i) => parseInt(i)).reduce((a, b) =>
    a + b
  ) * position;
}

function markValue(value) {
  return (items) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      for (let j = 0; j < item.length; j++) {
        if (item[j] == value) {
          items[i][j] = null;
        }
      }
    }
    return items;
  };
}

function processArray() {
  const result = [];
  for (let index = 0; index < (array.length / 5); index++) {
    const offset = index * 5;
    result.push(array.slice(0 + offset, 5 + offset));
  }

  return result.map((i) => {
    const arr = [];
    for (let index = 0; index < i.length; index++) {
      arr.push(i[index].trim().split(" ").filter((i) => i !== ""));
    }
    return arr;
  });
}

function combineRowAndColumn(arr) {
  return arr.map((items) => {
    const array = [];
    const result = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const out = [];
      for (let j = 0; j < item.length; j++) {
        out.push(items[j][i]);
      }
      result.push(out);
    }

    items.forEach((item) => array.push(item));
    array.push(...result);
    return array;
  });
}
