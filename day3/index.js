const string = await Deno.readTextFile("./input.txt");
const array = string.split(/[\r\n]+/).filter((i) => i);

// part 1
const gamma = [];
const epsilon = [];

for (let i = 0; i < array[0].length; i++) {
  if (oneIsMoreFrequent(array, i)) {
    gamma.push(1);
    epsilon.push(0);
  } else {
    gamma.push(0);
    epsilon.push(1);
  }
}

console.log(parseInt(epsilon.join(""), 2) * parseInt(gamma.join(""), 2));

// part 2
let oxygen = [];
function filterOxygen(arr, index) {
  if (oneIsMoreFrequent(arr, index)) {
    oxygen = arr.filter((i) => i[index] == 1);
  } else {
    oxygen = arr.filter((i) => i[index] == 0);
  }
  if (oxygen.length !== 1) {
    filterOxygen(oxygen, ++index);
  }
}
filterOxygen(array, 0);

let CO2 = [];
function filterCO2(arr, index) {
  if (oneIsMoreFrequent(arr, index)) {
    CO2 = arr.filter((i) => i[index] == 0);
  } else {
    CO2 = arr.filter((i) => i[index] == 1);
  }
  if (CO2.length !== 1) {
    filterCO2(CO2, ++index);
  }
}
filterCO2(array, 0);

console.log(parseInt(oxygen.join(""), 2) * parseInt(CO2.join(""), 2));

function extractByIndex(arr, index) {
  return arr.map((i) => i.charAt(index));
}

function oneIsMoreFrequent(array, index) {
  let count1 = 0;
  let count0 = 0;

  extractByIndex(array, index).map((a) => a == 0 ? count0++ : count1++);

  return count1 >= count0;
}
