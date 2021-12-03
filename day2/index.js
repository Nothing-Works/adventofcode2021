const string = await Deno.readTextFile("./input.txt");
const array = string.split(/[\r\n]+/).filter((i) => i);

// part 1
const arrayX = [];
const arrayY = [];

array.map((i) => {
  if (i.includes("forward")) {
    arrayX.push(parseInt(i.slice(i.length - 1)));
  }
  if (i.includes("down")) {
    arrayY.push(parseInt(i.slice(i.length - 1)));
  }
  if (i.includes("up")) {
    arrayY.push(-parseInt(i.slice(i.length - 1)));
  }
});

const result = arrayX.reduce((a, b) => a + b) * arrayY.reduce((a, b) => a + b);
console.log(result);

// part 2
let aim = 0;
const arrayX2 = [];
const arrayY2 = [];

array.map((i) => {
  if (i.includes("forward")) {
    arrayX2.push(parseInt(i.slice(i.length - 1)));
    arrayY2.push(aim * parseInt(i.slice(i.length - 1)));
  }
  if (i.includes("down")) {
    aim += parseInt(i.slice(i.length - 1));
  }
  if (i.includes("up")) {
    aim -= parseInt(i.slice(i.length - 1));
  }
});

const result2 = arrayX2.reduce((a, b) => a + b) *
  arrayY2.reduce((a, b) => a + b);
console.log(result2);
