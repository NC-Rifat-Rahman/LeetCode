// ── THEORY ───────────────────────────────────────────────────────
// A Graph is a data structure that represents connections between objects.
// Example: Social network (people = nodes, friendships = edges)
//          Road map (cities = nodes, roads = edges)

// Two types of graphs:
// 1. Undirected Graph → Edges have no direction (A is connected to B = B is connected to A)
// 2. Directed Graph   → Edges have direction (A → B is not same as B → A)

// We use Adjacency List to store the graph (most popular & efficient way)

// ── Generic Graph Class (Adjacency List) ──────────────────────────

type GraphType = 'undirected' | 'directed';   // This can only be one of these two values

class Graph<T> {                              // T = generic type (can be string, number, etc.)
    private adj: Map<T, T[]> = new Map();     // This map stores the graph: // Key   = a node // Value = list of its neighbors

    // Constructor runs when we create a new Graph
    constructor(private type: GraphType = 'undirected') { }   // Default is undirected graph

    // Add a single node to the graph
    addNode(n: T): void {
        if (!this.adj.has(n))           // If node doesn't exist yet
            this.adj.set(n, []);        // Add it with an empty neighbor list
    }

    // Add an edge (connection) between two nodes u and v
    addEdge(u: T, v: T): void {
        this.addNode(u);                // Make sure both nodes exist first
        this.addNode(v);

        this.adj.get(u)!.push(v);       // Add v to u's neighbor list (u → v)

        if (this.type === 'undirected') // If graph is undirected,
            this.adj.get(v)!.push(u);   // also add u to v's neighbor list (v → u)
    }

    // Return all neighbors of a given node
    neighbors(n: T): T[] {
        return this.adj.get(n) ?? [];   // Return neighbors, or empty array if node not found
    }

    // Return list of all nodes in the graph
    nodes(): T[] {
        return [...this.adj.keys()];    // Convert Map keys into a normal array
    }
}

// ── THEORY: BFS (Breadth-First Search) ───────────────────────────
// BFS is a way to visit/explore all nodes in a graph level by level.
// 
// Key Idea:
// - Use a QUEUE (First In, First Out)
// - Visit all immediate neighbors first (level 1)
// - Then visit their neighbors (level 2), and so on
// 
// Real-life example: 
// Searching for your friend in a crowd — you check your direct friends first, 
// then their friends, then their friends' friends, etc.
// 
// Uses: Shortest path, connected components, finding levels, etc.

// ── BFS (Single Source) ───────────────────────────────────────────
// This function starts from ONE node and visits all reachable nodes from it.

function bfs<T>(graph: Graph<T>, start: T): T[] {
    const visited = new Set<T>([start]);   // Keep track of visited nodes to avoid cycles
    const queue: T[] = [start];            // Queue starts with the starting node
    const result: T[] = [];                // This will store the order of visited nodes

    while (queue.length) {                 // Keep going until queue is empty
        const node = queue.shift()!;       // Remove the front node from queue (FIFO)
        result.push(node);                 // Add it to our result (we "visit" it now)

        for (const nb of graph.neighbors(node)) {   // Check all neighbors of current node
            if (!visited.has(nb)) {        // If neighbor has not been visited yet
                visited.add(nb);           // Mark it as visited
                queue.push(nb);            // Add it to the end of the queue
            }
        }
    }
    return result;                         // Return the order in which nodes were visited
}

// ── THEORY: Connected Components ─────────────────────────────────
// In an undirected graph, a "Connected Component" is a group of nodes 
// that are all connected to each other, but not connected to any other nodes 
// outside the group.
//
// Example: Imagine two separate islands with no bridge between them.
//          Each island is one connected component.
//
// bfsFull runs BFS multiple times — once for each unvisited node — 
// to discover all such separate groups.

// ── BFS Full (Finds All Connected Components) ─────────────────────

function bfsFull<T>(graph: Graph<T>): T[][] {
    const visited = new Set<T>();          // Global visited set for the whole graph
    const components: T[][] = [];          // This will store all connected components

    // Loop through EVERY node in the graph
    for (const node of graph.nodes()) {
        if (visited.has(node)) continue;   // Skip if already visited (already in some component)

        // ── Start a new BFS for a new component ───────────────────
        const component: T[] = [];         // Store nodes of current component
        const queue: T[] = [node];         // Start queue with current node
        visited.add(node);                 // Mark it visited

        while (queue.length) {             // Run BFS until queue is empty
            const curr = queue.shift()!;   // Take node from front of queue
            component.push(curr);          // Add to current component

            for (const nb of graph.neighbors(curr)) {   // Check all its neighbors
                if (!visited.has(nb)) {    // If not visited
                    visited.add(nb);       // Mark as visited
                    queue.push(nb);        // Add to queue
                }
            }
        }
        components.push(component);        // Finished one component, save it
    }

    return components;                     // Return all components found
}

// ── THEORY: DFS (Depth-First Search) ─────────────────────────────
// DFS is a graph traversal algorithm that explores as FAR as possible 
// along each branch before backtracking.
//
// Key Idea:
// - Use a STACK (Last In, First Out - LIFO)
// - Go deep down one path as much as possible
// - When you reach a dead end, go back (backtrack) and try another path
//
// Real-life example:
// Imagine exploring a maze — you keep walking forward down one path until 
// you hit a wall, then you backtrack and try another path.
//
// Main Difference from BFS:
// BFS = explores level by level (breadth-wise) → uses Queue
// DFS = explores deep first (depth-wise)     → uses Stack
//
// Uses: Finding paths, detecting cycles, topological sorting, 
//       solving puzzles/mazes, finding connected components.

// We are using Iterative DFS (using a stack) instead of Recursive DFS.
// This version avoids recursion depth limits and is easier to understand 
// for beginners when learning the algorithm step by step.

// ── DFS (Single Source - Iterative) ───────────────────────────────
// Starts from one node and visits all reachable nodes using Depth-First approach.

function dfs<T>(graph: Graph<T>, start: T): T[] {
    const visited = new Set<T>();          // Keep track of visited nodes
    const stack: T[] = [start];            // Stack starts with the starting node
    const result: T[] = [];                // Stores the order in which nodes are visited

    while (stack.length) {                 // Continue until stack is empty
        const node = stack.pop()!;         // Remove the LAST node (LIFO - Last In, First Out)

        if (visited.has(node))
            continue;   // Skip if already visited (important for correctness)

        visited.add(node);                 // Mark current node as visited
        result.push(node);                 // Add to result (this is when we "visit" it)

        // Add neighbors to stack in reverse order
        // .reverse() is used so the order matches typical left-to-right exploration
        for (const nb of [...graph.neighbors(node)].reverse()) {
            if (!visited.has(nb)) {        // Only add unvisited neighbors
                stack.push(nb);            // Push to stack (will be explored next)
            }
        }
    }
    return result;                         // Return the order of visitation
}

// ── THEORY: Connected Components with DFS ────────────────────────
// Just like bfsFull, we use the same outer loop trick.
// We run DFS multiple times — once from each unvisited node — 
// to discover all separate connected groups in the graph.

// ── DFS Full (Finds All Connected Components) ─────────────────────

function dfsFull<T>(graph: Graph<T>): T[][] {

    const visited = new Set<T>();          // Global visited set for entire graph
    const components: T[][] = [];          // Will store all connected components

    // Check every node in the graph
    for (const node of graph.nodes()) {

        if (visited.has(node))
            continue;   // Skip if already visited in previous component

        // ── Start a new DFS for a new component ───────────────────
        const component: T[] = [];         // Store nodes of current component
        const stack: T[] = [node];         // Start stack with current node

        while (stack.length) {             // Run DFS until stack is empty
            const curr = stack.pop()!;     // Take the most recently added node

            if (visited.has(curr))
                continue;   // Skip if already visited

            visited.add(curr);             // Mark as visited
            component.push(curr);          // Add to current component

            // Add neighbors to stack (in reverse order for consistent behavior)
            for (const nb of [...graph.neighbors(curr)].reverse()) {
                if (!visited.has(nb)) {    // Only unvisited neighbors
                    stack.push(nb);
                }
            }
        }
        components.push(component);        // Save the completed component
    }
    return components;                     // Return all components
}