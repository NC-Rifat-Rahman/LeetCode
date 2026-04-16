// ─── APPROACH: Depth-First Search (DFS) Flood Fill ───────────────────────────
//
// CORE IDEA:
// Treat the image grid as a graph where each pixel is a node, and edges exist
// between pixels that share a side (up/down/left/right). Starting from pixel
// (sr, sc), we want to repaint every node in the same connected component
// (i.e., all pixels reachable from the start that share the original color).
//
// WHY DFS?
// Flood fill is a classic connected-component problem. DFS is a natural fit
// because we can recursively "spread" from a pixel to its neighbors, going as
// deep as possible before backtracking — just like water flooding a region.
//
// STEP-BY-STEP WALKTHROUGH:
//
//   Given:  image = [[1,1,1],    sr = 1, sc = 1, color = 2
//                    [1,1,0],
//                    [1,0,1]]
//
//   Original color at (1,1) = 1. We want to repaint all connected 1s → 2.
//
//   Step 1: Start at (1,1). Paint it 2. Grid becomes:
//           [[1,1,1],
//            [1,2,0],
//            [1,0,1]]
//
//   Step 2: Recurse UP    → (0,1) is 1 → paint 2, recurse its neighbors.
//   Step 3: Recurse UP    → (0,0) is 1 → paint 2, no more matching neighbors.
//           Recurse RIGHT → (0,2) is 1 → paint 2, no more matching neighbors.
//   Step 4: Back at (1,1), recurse DOWN  → (2,1) is 0 → base case, return.
//   Step 5: Back at (1,1), recurse LEFT  → (1,0) is 1 → paint 2, recurse.
//           Recurse UP    → (0,0) is now 2 ≠ 1 → base case, return.
//           Recurse DOWN  → (2,0) is 1 → paint 2, recurse its neighbors.
//   Step 6: Back at (1,1), recurse RIGHT → (1,2) is 0 → base case, return.
//
//   Final:  [[2,2,2],
//            [2,2,0],
//            [2,0,1]]   ← bottom-right 1 is isolated (not reachable from start)
//
// HOW INFINITE RECURSION IS AVOIDED:
//   We do NOT use a separate "visited" set. Instead, painting a pixel with
//   newColor before recursing serves as the visited marker. When a neighbor
//   is checked, image[sr][sc] !== originalColor evaluates true for already-
//   painted cells, so we return immediately — no cell is ever entered twice.
//
// EDGE CASE — same color early exit:
//   If the starting pixel's color already equals the target color, painting
//   would change nothing visually, but without the early exit we'd loop
//   forever (paint → check neighbor → it matches originalColor=newColor →
//   paint again → ...). So we return the image untouched immediately.
//
// COMPLEXITY:
//   Time  → O(m × n): every pixel is visited at most once.
//   Space → O(m × n): recursion stack depth in the worst case (e.g. a single
//           serpentine path winding through every cell in the grid).
//
// ALTERNATIVE APPROACHES (not used here but worth knowing):
//   • BFS (queue-based): same O(m×n) complexity, iterative, avoids stack
//     overflow risk on very large grids.
//   • Iterative DFS (explicit stack): same idea as recursive DFS but manually
//     manages the stack — also sidesteps call-stack overflow concerns.
// ─────────────────────────────────────────────────────────────────────────────

function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    if (image[sr][sc] === color)
        return image;

    fill(image, sr, sc, image[sr][sc], color);

    return image;
}

function fill(image: number[][], sr: number, sc: number, originalColor: number, newColor: number) {
    if (sc < 0 || sr < 0 || sr >= image.length || sc >= image[0].length || image[sr][sc] !== originalColor)
        return;

    image[sr][sc] = newColor;

    fill(image, sr - 1, sc, originalColor, newColor); // up
    fill(image, sr + 1, sc, originalColor, newColor); // down
    fill(image, sr, sc - 1, originalColor, newColor); // left
    fill(image, sr, sc + 1, originalColor, newColor); // right
}