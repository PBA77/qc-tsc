"use strict";
exports.__esModule = true;
var readlineSync = require("readline-sync");
var inputData = function () {
    var transm = [];
    readlineSync.setDefaultOptions({ prompt: "" });
    var count = parseInt(readlineSync.prompt(), 10);
    for (var i = 0; i < count + 2; i++) {
        var _a = readlineSync
            .prompt()
            .split(" ")
            .map(function (item) { return parseInt(item, 10); }), xVal = _a[0], yVal = _a[1], _b = _a[2], rVal = _b === void 0 ? 0 : _b;
        transm.push({ x: xVal, y: yVal, r: rVal });
    }
    return transm;
};
var isPassageSafe = function (points) {
    var N = points.length;
    var visited = Array(N).fill(false);
    visited[N - 2] = true;
    var queue = [N - 2];
    while (true) {
        var x = queue.pop();
        if (x === undefined)
            return false;
        for (var node = 0; node < N; node++) {
            if (node !== x &&
                !visited[node] &&
                transmsConnected(points[x], points[node])) {
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
var transmsConnected = function (t1, t2) {
    return Math.pow((t1.x - t2.x), 2) + Math.pow((t1.y - t2.y), 2) <= Math.pow((t1.r + t2.r), 2);
};
var transmitters = inputData();
if (isPassageSafe(transmitters)) {
    console.log("Safe passage is possible.");
}
else {
    console.log("Safe passage is not possible.");
}
