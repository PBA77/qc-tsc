import * as readlineSync from "readline-sync";

type Tr = { x: number; y: number; r: number };

const inputData = (): Tr[] => {
  const transm = [];
  readlineSync.setDefaultOptions({ prompt: "" });
  const count = parseInt(readlineSync.prompt(), 10);
  for (let i = 0; i < count + 2; i++) {
    const [xVal, yVal, rVal = 0] = readlineSync
      .prompt()
      .split(" ")
      .map((item) => parseInt(item, 10));

    transm.push({ x: xVal, y: yVal, r: rVal });
  }
  return transm;
};

const isPassageSafe = (points: Tr[]) => {
  const N = points.length;
  const visited = Array(N).fill(false);
  visited[N - 2] = true;
  const queue: number[] = [N - 2];

  while (true) {
    const x = queue.pop();
    if (x === undefined) return false;
    for (let node = 0; node < N; node++) {
      if (
        node !== x &&
        !visited[node] &&
        transmsConnected(points[x], points[node])
      ) {
        if (node === N - 1) {
          return true;
        }
        queue.push(node);
        visited[node] = true;
      }
    }
  }
  return false;
};

const transmsConnected = (t1: Tr, t2: Tr) =>
  (t1.x - t2.x) ** 2 + (t1.y - t2.y) ** 2 <= (t1.r + t2.r) ** 2;

const transmitters = inputData();

if (isPassageSafe(transmitters)) {
  console.log("Safe passage is possible.");
} else {
  console.log("Safe passage is not possible.");
}
