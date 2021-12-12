const string = await Deno.readTextFile("./input.txt");

const lines = string.split(/[\r\n]+/).filter((i) => i).map(i=>i.split("-"));

solve(lines, 0);
solve(lines, 1);

function solve(lines, maxDupes) {
    const connections = {};
    for (const [a, b] of lines) {
      if (b !== 'start' && a !== 'end') {
        connections[a] = connections[a] ?? [];
        connections[a].push(b);
      }
      if (a !== 'start' && b !== 'end') {
        connections[b] = connections[b] ?? [];
        connections[b].push(a);
      }
    }

    const validPaths = [];
    let paths = [['start']];
    while (paths.length) {
      const nextPaths = [];
      for (const path of paths) {
        const cave = path[path.length - 1];
        for (const nextCave of connections[cave]) {
          const nextPath = [...path, nextCave];
          if (nextCave === 'end') {
            validPaths.push(nextPath);
            continue;
          }
          const smallCaves = nextPath.filter(isSmall);
          if (smallCaves.length > new Set(smallCaves).size + maxDupes) {
            continue;
          }
          nextPaths.push(nextPath);
        }
      }
      paths = nextPaths;
    }
    console.log(validPaths.length);
  }

  function isSmall(cave) {
    return /[a-z]/.test(cave);
  }