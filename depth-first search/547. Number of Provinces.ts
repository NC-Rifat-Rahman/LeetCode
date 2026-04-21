/*
 * PROBLEM UNDERSTANDING:
 * ─────────────────────
 * We have `n` cities represented as nodes in a graph.
 * The input `isConnected` is an n×n ADJACENCY MATRIX where:
 *   - isConnected[i][j] = 1 → city i and city j are DIRECTLY connected
 *   - isConnected[i][j] = 0 → no direct connection
 *
 * A "province" = a group of cities that are connected directly OR
 * indirectly (transitive connection). We must count total provinces.
 *
 * KEY INSIGHT — Reframe as a Graph Problem:
 * ──────────────────────────────────────────
 * This is exactly the classic "Count Connected Components" problem:
 *
 *        City 0 ── City 1        City 2
 *            (province 1)      (province 2)
 *
 * Each isolated cluster of cities = one connected component = one province.
 * Total provinces = total connected components in the graph.
 *
 * WHY DFS?
 * ────────
 * DFS is ideal for exploring connected components because:
 *   1. Start at any unvisited node (city)
 *   2. Recursively visit ALL reachable nodes from it
 *   3. When DFS returns, the ENTIRE component is marked visited
 *   4. Every time we need a fresh DFS start → new province found
 *
 * ALGORITHM — Step by Step:
 * ──────────────────────────
 *   Step 1: Maintain a `visited[]` boolean array of size n.
 *           visited[i] = true means city i has already been
 *           assigned to a province — skip it.
 *
 *   Step 2: Loop through every city 0..n-1 (outer for-loop).
 *           This guarantees no city is ever skipped.
 *
 *   Step 3: If city is NOT visited → brand new province discovered.
 *           Call dfs(city) to explore and mark its ENTIRE component.
 *           Increment province counter by 1.
 *
 *   Step 4: Inside dfs(city):
 *           a) Mark city as visited.
 *           b) Scan its row in isConnected[city][0..n-1].
 *           c) For each neighbor where value = 1 and not visited,
 *              recursively call dfs(neighbor).
 *           d) When all neighbors are exhausted, backtrack.
 *              The full province is now painted visited.
 *
 * VISUAL WALKTHROUGH (3 cities: g1 = [[1,1,0],[1,1,0],[0,0,1]]):
 * ────────────────────────────────────────────────────────────────
 *
 *   Graph:   0 ── 1    2        visited = [F, F, F]   provinces = 0
 *
 *   city=0 → not visited → dfs(0)
 *     visit 0           → visited = [T, F, F]
 *     neighbor 1 → connected & unvisited → dfs(1)
 *       visit 1         → visited = [T, T, F]
 *       neighbor 0 → already visited, skip
 *       done
 *     neighbor 2 → not connected, skip
 *     done
 *   provinces++ → provinces = 1
 *
 *   city=1 → already visited, skip
 *
 *   city=2 → not visited → dfs(2)
 *     visit 2           → visited = [T, T, T]
 *     no neighbors connected
 *     done
 *   provinces++ → provinces = 2
 *
 *   Final answer: 2 ✓
 *
 * COMPLEXITY ANALYSIS:
 * ─────────────────────
 *   Time  → O(n²)  Every cell of the n×n matrix is visited once
 *   Space → O(n)   visited[] array + recursion call stack (depth ≤ n)
 *
 * ═══════════════════════════════════════════════════════════════════
 */

function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const visited: boolean[] = new Array(n).fill(false);
    let provinces = 0;

    function dfs(city: number): void {
        // Mark current city as visited so it won't be re-explored
        visited[city] = true;

        // Scan every potential neighbor in the adjacency matrix row
        for (let neighbor = 0; neighbor < n; neighbor++) {
            // Only recurse if there is a direct connection AND
            // the neighbor hasn't been visited yet
            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    for (let city = 0; city < n; city++) {
        if (!visited[city]) {
            // Each fresh DFS = one new province being fully explored
            dfs(city);
            provinces++;
        }
    }

    return provinces;
}