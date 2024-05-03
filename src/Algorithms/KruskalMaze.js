// Implementation of Kruskal's algorithm
// It is used to find the minimum spanning tree of a graph but will be used to the walls of our maze

// Import the UnionFind class
import UnionFind from "../DataStructures/UnionFind";

// Function to generate the maze
export function KruskalMaze(width, height) {
  // Create the union find data structure
  const uf = new UnionFind(width * height);

  // Create the walls array
  const walls = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (j < width - 1) {
        walls.push([i * width + j, i * width + j + 1]);
      }
      if (i < height - 1) {
        walls.push([i * width + j, (i + 1) * width + j]);
      }
    }
  }

  // Create a shuffled copy of the walls array
  const shuffledWalls = walls.slice();
  for (let i = shuffledWalls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWalls[i], shuffledWalls[j]] = [shuffledWalls[j], shuffledWalls[i]];
  }

  while (uf.numSets > 1) {
    const wall = shuffledWalls.pop();
    const [x, y] = wall;
    const u = uf.find(x);
    const v = uf.find(y);
    if (u !== v) {
      uf.union(u, v);
      // Remove the wall from the wall array
      delete walls[walls.indexOf(wall)];
    } else {
      shuffledWalls.unshift(wall);
    }
  }

  // Create the maze grid with each cell as i * width + j
  const maze = Array(height)
    .fill(null)
    .map(() => Array(width).fill(0));

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      maze[i][j] = i * width + j;
    }
  }

  return walls;
}
