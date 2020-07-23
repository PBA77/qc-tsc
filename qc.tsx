import * as readlineSync from "readline-sync";

type Trans = { x: number; y: number; r: number };

const inputData = (): Trans[] => {
  readlineSync.setDefaultOptions({ prompt: "" });
  const transmittersNumber = parseInt(readlineSync.prompt(), 10);
  return Array.from({ length: transmittersNumber + 2 }, () =>
    readlineSync
      .prompt()
      .split(" ")
      .map((item) => parseInt(item, 10))
  ).map((item) => {
    return { x: item[0], y: item[1], r: item[2] || 0 };
  });
};

const isPassageSafe = (points: Trans[]) => {
  const N = points.length;
  const START_POINT = N - 2;
  const END_POINT = N - 1;
  const visited = Array.from({ length: N }, (_, i) => i === START_POINT);
  const queue = [START_POINT];

  while (true) {
    const x = queue.pop();
    if (x === undefined) return false;
    for (let node = 0; node < N; node++) {
      if (
        node !== x &&
        !visited[node] &&
        transmsConnected(points[x], points[node])
      ) {
        if (node === END_POINT) return true;
        queue.push(node);
        visited[node] = true;
      }
    }
  }
};

const transmsConnected = (t1: Trans, t2: Trans) =>
  (t1.x - t2.x) ** 2 + (t1.y - t2.y) ** 2 <= (t1.r + t2.r) ** 2;

const transmitters = inputData();

console.log(transmitters);

if (isPassageSafe(transmitters)) console.log("Safe passage is possible.");
else console.log("Safe passage is not possible.");
