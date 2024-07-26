const getTotalIsles = function (grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

  // Helper function to perform DFS
  function dfs(r, c) {
      // Mark this cell as visited
      visited[r][c] = true;

      // Explore neighbors
      for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 'L' && !visited[nr][nc]) {
              dfs(nr, nc);
          }
      }
  }

  // Initialize visited matrix
  const visited = new Array(rows).fill().map(() => new Array(cols).fill(false));
  let islandCount = 0;

  // Traverse through all cells of the grid
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
          if (grid[r][c] === 'L' && !visited[r][c]) {
             
              islandCount++;
              dfs(r, c); // Mark all connected land cells as visited
          }
      }
  }

  return islandCount;
};

module.exports = getTotalIsles;
