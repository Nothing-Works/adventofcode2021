const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i);

let count = 0;

array.reduce((pre, cur) => {
  if (cur - pre > 0) {
    count++;
  }
  return cur;
});

console.log(count);
