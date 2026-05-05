/**
 * Given an m x n binary matrix grid, where 1 represents land and 0 represents water.
 * An island is a group of 1's connected 4-directionally (up, down, left, right).
 * Find the maximum area (number of cells) of any island in the grid.
 * If there is no island, return 0.
 * 
 * Approach: Depth-First Search (DFS) with In-Place Modification
 * 
 * 1. We traverse every cell in the grid using a nested loop.
 * 2. Whenever we find a '1' (unvisited land), we start a DFS from that cell.
 * 3. In DFS:
 *    - Mark the current cell as visited by changing grid[r][c] = 0
 *    - Count 1 for the current cell
 *    - Recursively explore all 4 directions (up, down, left, right)
 *    - Sum up the area returned from all four directions
 * 4. After each DFS completes, we update the maximum area found so far.
 * 
 * Why In-Place Modification Works:
 * - Changing 1 → 0 serves as a "visited" marker
 * - This prevents revisiting the same cell and avoids infinite recursion
 * - No extra space needed for a visited 2D array or Set
 * 
 * Time Complexity: O(m * n)
 *   - Each cell is visited at most once
 * 
 * Space Complexity: O(m * n) in worst case
 *   - Due to recursion stack (when the entire grid is one big island)
 * 
 * Advantages of this approach:
 * - Clean and intuitive
 * - Modifies grid in-place (saves space)
 * - Very efficient in practice
 * 
 * Note: The problem states all four edges are surrounded by water,
 *       so we don't need to worry about special boundary cases beyond index checks.
 */

function maxAreaOfIsland(grid: number[][]): number {
    const numberOfRows = grid.length;

    // Handle edge case: empty grid
    if (numberOfRows === 0)
        return 0;

    const numberOfCols = grid[0].length;

    /**
     * DFS helper function that returns the area of the island
     * starting from cell (r, c)
     */
    function dfsRec(r: number, c: number): number {
        // Base case: out of bounds or water or already visited
        if (r < 0 || c < 0 || r === numberOfRows || c === numberOfCols ||
            grid[r][c] === 0) {
            return 0;
        }

        // Mark current cell as visited by changing 1 to 0
        grid[r][c] = 0;

        let area = 1; // Current cell contributes 1 to area

        // Explore all 4 directions and sum their areas
        area += dfsRec(r + 1, c);     // Down
        area += dfsRec(r - 1, c);     // Up
        area += dfsRec(r, c + 1);     // Right
        area += dfsRec(r, c - 1);     // Left

        return area;
    }

    let maxArea = 0;

    // Check every cell in the grid
    for (let r = 0; r < numberOfRows; r++) {
        for (let c = 0; c < numberOfCols; c++) {
            if (grid[r][c] === 1) {
                const currentIslandArea = dfsRec(r, c);
                maxArea = Math.max(maxArea, currentIslandArea);
            }
        }
    }

    return maxArea;
}