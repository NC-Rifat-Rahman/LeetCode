/**
 * Approach: Iterative Depth-First Search (DFS) using Stack
 * 
 * Problem: Find the maximum depth of a binary tree.
 * Maximum depth is the number of nodes along the longest path 
 * from the root node down to the farthest leaf node.
 * 
 * Why Iterative DFS?
 * - We simulate the recursive call stack manually using our own stack.
 * - This avoids the recursion depth limit that can occur in very deep trees.
 * 
 * How it works:
 * 1. We use a stack that stores pairs: [TreeNode, depth]
 * 2. Start by pushing the root node with depth = 1
 * 3. While the stack is not empty:
 *      - Pop the top element (node and its current depth)
 *      - Update the maximum depth found so far
 *      - Push the right child first, then the left child with depth + 1
 * 4. Because we use a stack (LIFO), we go deep into one branch before exploring others.
 * 
 * Time Complexity: O(N) - We visit each node exactly once
 * Space Complexity: O(H) - Where H is the height of the tree (worst case O(N) for skewed tree)
 * 
 * Note: The 'visited' set is not needed for trees (no cycles).
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}


function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let stack: [TreeNode, number][] = [[root, 1]];
    let maxDepth = 0;

    while (stack.length > 0) {
        const [node, depth] = stack.pop()!;

        // Update maximum depth
        maxDepth = Math.max(maxDepth, depth);

        // Push right child first, then left
        if (node.right !== null) {
            stack.push([node.right, depth + 1]);
        }
        if (node.left !== null) {
            stack.push([node.left, depth + 1]);
        }
    }
    return maxDepth;
}