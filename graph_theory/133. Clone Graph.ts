class _Node {
    val: number;
    neighbors: _Node[];
    constructor(val?: number, neighbors?: _Node[]) {
        this.val = val ?? 0;
        this.neighbors = neighbors ?? [];
    }
}

/**
 * CLONE GRAPH — Deep Copy of an Undirected Connected Graph
 *
 * PROBLEM:
 *   Each node has a `val` and a `neighbors` array (references to other nodes).
 *   We need a deep copy — entirely new node objects in memory,
 *   where no cloned node references any original node.
 *
 * CHALLENGE — CYCLES:
 *   Graphs can have cycles (e.g., 1 → 2 → 1).
 *   Naively cloning neighbors causes infinite recursion.
 *   We need a way to say: "Already cloned this node — here it is, stop recursing."
 *
 * APPROACH — DFS + Visited Map:
 *   Use a map (val → cloned node) that serves two purposes simultaneously:
 *     1. Cycle detection  — if already cloned, don't clone again
 *     2. Reference sharing — return the SAME clone instance wherever
 *                            that node appears as a neighbor
 *
 * COMPLEXITY:
 *   Time  — O(V + E): each node visited once, each edge traversed once
 *   Space — O(V):     map holds one entry per node;
 *                     recursion stack depth up to O(V) in worst case
 */
function cloneGraph(node: _Node | null): _Node | null {
    // Edge case: empty graph
    if (!node) return null;

    /**
     * visited map: val → cloned node
     *
     * Bridges original and cloned graph during construction.
     * Discarded after cloning is complete.
     *
     * Example for graph 1-2-3-4-1 (a cycle):
     *
     *   Original Graph          Cloned Graph (separate memory)
     *   ──────────────          ──────────────────────────────
     *     [1] ── [2]              [1'] ── [2']
     *      |      |                |       |
     *     [4] ── [3]              [4'] ── [3']
     *
     *   visited = { 1→[1'], 2→[2'], 3→[3'], 4→[4'] }
     */
    const visited = new Map<number, _Node>();

    /**
     * DFS — Recursively clones a node and all nodes reachable from it.
     *
     * Full trace for graph: 1:[2,4], 2:[1,3], 3:[2,4], 4:[3,1]
     *
     *   dfs(1) → not seen, create clone(1), register {1:clone1}
     *     dfs(2) → not seen, create clone(2), register {1,2}
     *       dfs(1) → SEEN ✅ return clone1 immediately  ← cycle broken
     *       dfs(3) → not seen, create clone(3), register {1,2,3}
     *         dfs(2) → SEEN ✅ return clone2 immediately
     *         dfs(4) → not seen, create clone(4), register {1,2,3,4}
     *           dfs(3) → SEEN ✅ return clone3
     *           dfs(1) → SEEN ✅ return clone1
     *           clone4.neighbors = [clone3, clone1] ✓
     *         clone3.neighbors = [clone2, clone4] ✓
     *       clone2.neighbors = [clone1, clone3] ✓
     *     dfs(4) → SEEN ✅ return clone4 immediately
     *     clone1.neighbors = [clone2, clone4] ✓
     *   return clone1  ← final answer
     *
     * Every node cloned exactly once. Every cycle handled cleanly.
     */
    function dfs(curr: _Node): _Node {
        /**
         * STEP A — Cycle guard:
         * If this node was already cloned, immediately return the existing
         * clone. This is what breaks cycles and ensures every node is
         * cloned exactly once.
         */
        if (visited.has(curr.val))
            return visited.get(curr.val)!;

        /**
         * STEP B — Create the new node:
         * Fresh node with same value. neighbors array is empty for now —
         * we populate it after registering in the map.
         */
        const clone = new _Node(curr.val);

        /**
         * STEP C — Register BEFORE recursing (critical!):
         * Store the clone in the map BEFORE processing its neighbors.
         * If we stored it AFTER, a cycle would cause infinite recursion
         * before we ever reached this line.
         *
         * e.g., without pre-registration on graph 1 ↔ 2:
         *   dfs(1) → creates clone1 ... recurses into dfs(2)
         *     dfs(2) → creates clone2 ... recurses into dfs(1)
         *       dfs(1) → creates clone1 again ... recurses into dfs(2)
         *         → infinite loop 💥
         *
         * With pre-registration:
         *   dfs(1) → creates clone1, registers {1:clone1}, recurses into dfs(2)
         *     dfs(2) → creates clone2, registers {2:clone2}, recurses into dfs(1)
         *       dfs(1) → SEEN ✅ returns clone1 immediately ← cycle broken
         */
        visited.set(curr.val, clone);

        /**
         * STEP D — Recursively clone all neighbors:
         * For each neighbor, recurse. The call will either:
         *   - Hit STEP A and return an already-cloned node (if visited), or
         *   - Create a brand new clone for that neighbor
         * Either way, we get back a valid cloned node to push into
         * this clone's neighbors array.
         */
        for (const neighbor of curr.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        /**
         * STEP E — Return the finished clone:
         * The clone now has all its neighbors populated with valid
         * cloned nodes. No reference to any original node remains.
         */
        return clone;
    }

    return dfs(node);
}