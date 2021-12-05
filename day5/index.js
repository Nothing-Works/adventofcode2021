const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i);

const xyArray = array.map((i) => {
  return i.split("->").map((e) => e.split(",")).flat().map((i) =>
    parseInt(i.trim())
  );
});

const result = [...Array(1000)].map((_) => Array(1000).fill(null));

generateAllPoints(xyArray).forEach((el) => {
  result[el[1]][el[0]] += 1;
});

console.log(
  result.map((i) => i.filter((j) => j > 1)).filter((i) => i.length !== 0).flat()
    .length,
);

function generateAllPoints(arr) {
  return arr.map((i) => {
    const array = [];
    const x1 = parseInt(i[0]);
    const y1 = parseInt(i[1]);
    const x2 = parseInt(i[2]);
    const y2 = parseInt(i[3]);
    if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      const abs = Math.abs(x1 - x2);
      for (let index = 0; index <= abs; index++) {
        if (x1 < x2 && y1 < y2) {
          array.push([x1 + index, y1 + index]);
        } else if (x1 < x2 && y1 > y2) {
          array.push([x1 + index, y1 - index]);
        } else if (x1 > x2 && y1 < y2) {
          array.push([x1 - index, y1 + index]);
        } else {
          array.push([x1 - index, y1 - index]);
        }
      }
    }

    if (x1 == x2 || y1 == y2) {
      const xabs = Math.abs(x1 - x2);
      const yabs = Math.abs(y1 - y2);
      if (xabs === 0 && yabs === 0) {
        array.push([x1, y1]);
      }
      if (xabs) {
        const min = Math.min(x1, x2);
        for (let index = 0; index <= xabs; index++) {
          array.push([min + index, y1]);
        }
      }
      if (yabs) {
        const min = Math.min(y1, y2);
        for (let index = 0; index <= yabs; index++) {
          array.push([x1, min + index]);
        }
      }
    }
    return array;
  }).filter((i) => i).flat();
}
