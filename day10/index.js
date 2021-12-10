const string = await Deno.readTextFile("./input.txt");
const closing = [')',']','}','>'];
const open = ['(','[','{','<'];

//part 1
let array = string.split(/[\r\n]+/).filter((i) => i).map(i=>i.split(""));
const mapper = {
    0: 3,
    1:57,
    2:1197,
    3:25137
}

let currentLength = array.map(i=>i.length).reduce((a,b)=>a+b);
let previousLength = 0;

while (currentLength != previousLength) {
    array = array.map(i=>setNull(i));
    previousLength = currentLength;
    currentLength = array.map(i=>i.length).reduce((a,b)=>a+b);
}

console.log(array.map(i=>{
    let target = null;
    for (const iterator of i) {
        const index = closing.indexOf(iterator);
        if (index >= 0) {
            target = index;
            break;
        }
    }
    return target;
}).filter(i=>i!==null).map(i=>mapper[i]).reduce((a,b)=>a+b))

//part 2
let array2 = string.split(/[\r\n]+/).filter((i) => i).map(i=>i.split(""));
const mapper2 = {
    0:1,
    1:2,
    2:3,
    3:4
}

let currentLength2 = array.map(i=>i.length).reduce((a,b)=>a+b);
let previousLength2 = 0;

while (currentLength2 != previousLength2) {
    array2 = array2.map(i=>setNull(i));
    previousLength2 = currentLength2;
    currentLength2 = array2.map(i=>i.length).reduce((a,b)=>a+b);
}

const result = array2.filter(i=>i.every(j=>open.includes(j))).map(i=>i.reverse()).map(i=>i.map(el=>mapper2[open.indexOf(el)]))
.map(i=>i.reduce((cur,acc) => (5*cur + acc) ,0)).sort((a,b)=> a - b);


console.log(result[(result.length-1)/2])

function setNull(arr) {
    const protentialClose = []
    for (let index = 0; index < arr.length; index++) {
        if (closing.indexOf(arr[index]) >= 0) {
            protentialClose.push([index,closing.indexOf(arr[index])])
        }
    }
    for (const iterator of protentialClose) {
        if (open.indexOf(arr[iterator[0] - 1]) == iterator[1]) {
            arr[iterator[0]] = null
            arr[iterator[0]-1] = null
        }
    }
    return arr.filter(i=>i)
}