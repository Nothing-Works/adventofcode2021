const string = await Deno.readTextFile("./input.txt");

const array = string.split(/[\r\n]+/).filter((i) => i);

console.log(array);
console.log(
  array.map((i) =>
    i.split("|")[1].trim().split(" ").filter((i) =>
      i.length === 2 || i.length === 3 || i.length === 4 || i.length === 7
    )
  ).flat().length,
);

//part2
console.log(
  array.map((i) => process(i)).map((i) => parseInt(i)).reduce((a, b) => a + b),
);
function process(string1) {
  const firstPart = string1.split("|")[0].trim();

  const test = firstPart.split(" ");
  const one = test.filter((i) => i.length === 2).toString().split("");
  const seven = test.filter((i) => i.length === 3).toString().split("");
  const four = test.filter((i) => i.length === 4).toString().split("");
  const a = seven.filter((i) => !one.includes(i));
  const fourMone = four.filter((i) => !one.includes(i));

  const five = test.filter((i) => i.length === 5).filter((i) => {
    let itFive = 0;
    for (const iterator of fourMone) {
      if (i.includes(iterator)) {
        itFive++;
      }
    }
    if (itFive === 2) {
      return i;
    }
  }).toString().split("");
  const c = one.filter((i) => !five.includes(i));
  const f = one.filter((i) => !c.includes(i));
  const twoAndThree = test.filter((i) => i.length === 5).filter((i) => {
    let itFive = 0;
    for (const iterator of fourMone) {
      if (i.includes(iterator)) {
        itFive++;
      }
    }
    if (itFive !== 2) {
      return i;
    }
  });
  const commonInTwoAndThree = twoAndThree[0].split("").filter((i) =>
    !twoAndThree[1].includes(i)
  ).concat(twoAndThree[1].split("").filter((x) => !twoAndThree[0].includes(x)));
  const e = commonInTwoAndThree.filter((i) => !f.includes(i));
  const two = twoAndThree.filter((i) => i.includes(e.toString()));
  const dAndg = two.toString().split("").filter((i) => !a.includes(i)).filter(
    (i) => !c.includes(i)
  ).filter((i) => !e.includes(i));
  const dAndb = four.filter((i) => !f.includes(i)).filter((i) =>
    !c.includes(i)
  );
  const d = dAndg.filter((i) => dAndb.includes(i));
  const b = dAndb.filter((i) => !d.includes(i));
  const g = dAndg.filter((i) => !d.includes(i));

  const mapObject = {
    [a.toString()]: "a",
    [b.toString()]: "b",
    [c.toString()]: "c",
    [d.toString()]: "d",
    [e.toString()]: "e",
    [f.toString()]: "f",
    [g.toString()]: "g",
  };
  const valueObject = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };

  const secondPart = string1.split("|")[1].trim().split(" ").map((i) =>
    i.split("")
  )
    .map((i) => {
      return i.map((j) => {
        return mapObject[j];
      });
    }).map((i) => valueObject[i.sort().join("")]);
  return secondPart.join("");
}
