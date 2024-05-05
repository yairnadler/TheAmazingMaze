export function BFS(walls, width, height, data, hasWall) {
  const start = 0;
  const end = width * height - 1;
  const queue = [start];
  const visited = new Set();
  const parent = new Map();
  visited.add(start);
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === end) {
      break;
    }
    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
        parent.set(neighbor, current);
      }
    }
  }
  const winningPath = [];
  let current = end;
  while (current !== start) {
    winningPath.push(current);
    current = parent.get(current);
  }
  winningPath.push(start);
  return winningPath.reverse();

  function getNeighbors(cellIndex) {
    const neighbors = [];
    const i = Math.floor(cellIndex / width);
    const j = cellIndex % width;
    if (i > 0 && !hasWall(cellIndex, -width)) {
      neighbors.push(cellIndex - width);
    }
    if (i < height - 1 && !hasWall(cellIndex, width)) {
      neighbors.push(cellIndex + width);
    }
    if (j > 0 && !hasWall(cellIndex, -1)) {
      neighbors.push(cellIndex - 1);
    }
    if (j < width - 1 && !hasWall(cellIndex, 1)) {
      neighbors.push(cellIndex + 1);
    }
    return neighbors;
  }
}
