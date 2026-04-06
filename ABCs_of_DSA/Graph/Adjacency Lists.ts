
/**
 * THEORY OF IMPLEMENTATION - Undirected Graph using Adjacency List
 * 
 * This is the undirected version of the previous DirectedGraph.
 * It uses a single Map<T, Set<T>> called adjList (Adjacency List).
 * 
 * WHY ADJACENCY LIST for Undirected Graph?
 * - Much more efficient than matrix when the graph is sparse (few edges).
 * - For each node, adjList[node] stores all its directly connected neighbors.
 * - Since the graph is undirected, every edge {u, v} is stored TWICE:
 *     - in u's set: v
 *     - in v's set: u
 *   This symmetry makes the structure consistent.
 * 
 * KEY PROPERTIES:
 * - No direction → adding edge u-v automatically adds both directions.
 * - Memory usage: O(nodes + edges) instead of O(nodes²) like matrix.
 * - Operations are fast on average (Set operations are O(1)).
 * 
 * IMPORTANT DESIGN NOTES:
 * - addEdge makes both directions to keep it undirected.
 * - removeEdge removes from both sides.
 * - removeNode first removes the node from all its neighbors' sets,
 *   then deletes the node itself (prevents dangling references).
 * - edgeCount divides by 2 because each edge is counted twice (once in each direction).
 * 
 * COMPARISON with previous DirectedGraph:
 * - Directed uses two Maps (outList + inList) because direction matters.
 * - Undirected uses only one Map (adjList) because edges are symmetric.
 * - Both use generic <T> so nodes can be string, number, or any type.
 * 
 * This implementation is clean, efficient, and consistent with the DirectedGraph you saw earlier.
 */

class UndirectedGraphList<T> {
    // adjList: For each node, stores all its neighbors (undirected connections)
    private adjList: Map<T, Set<T>> = new Map();

    /**
     * Adds a node if it doesn't already exist.
     * Creates an empty Set to hold its neighbors.
     */
    addNode(node: T): void {
        if (!this.adjList.has(node)) {
            this.adjList.set(node, new Set());
        }
    }

    /**
     * Adds an undirected edge between u and v.
     * Because it's undirected, we add v to u's list AND u to v's list.
     */
    addEdge(u: T, v: T): void {
        this.addNode(u);   // ensure nodes exist
        this.addNode(v);

        this.adjList.get(u)!.add(v);   // u is connected to v
        this.adjList.get(v)!.add(u);   // v is connected to u (symmetric)
    }

    /**
     * Removes the undirected edge between u and v.
     * Deletes from both neighbors sets.
     */
    removeEdge(u: T, v: T): void {
        this.adjList.get(u)?.delete(v);
        this.adjList.get(v)?.delete(u);
    }

    /**
     * Completely removes a node and all its edges.
     * 
     * Step-by-step:
     * 1. For every neighbor of this node, remove this node from their neighbor list.
     * 2. Then delete the node itself from adjList.
     * 
     * This cleanup prevents any "ghost" edges pointing to a deleted node.
     */
    removeNode(node: T): void {
        // Tell all my neighbors: "I no longer exist"
        this.adjList.get(node)?.forEach(nb => {
            this.adjList.get(nb)?.delete(node);
        });

        // Remove myself
        this.adjList.delete(node);
    }

    /**
     * Checks if there is an edge between u and v.
     */
    hasEdge(u: T, v: T): boolean {
        return this.adjList.get(u)?.has(v) ?? false;
    }

    /**
     * Returns all neighbors of the given node.
     */
    neighbors(node: T): T[] {
        return [...(this.adjList.get(node) ?? [])];   // convert Set to Array
    }

    /**
     * Returns the degree (number of neighbors) of the node.
     */
    degree(node: T): number {
        return this.adjList.get(node)?.size ?? 0;
    }

    /**
     * Returns list of all nodes in the graph.
     */
    nodes(): T[] {
        return [...this.adjList.keys()];
    }

    /**
     * Returns total number of unique undirected edges.
     * Each edge is stored twice (once in each direction), so we divide by 2.
     */
    edgeCount(): number {
        let sum = 0;
        this.adjList.forEach(s => (sum += s.size));
        return sum / 2;   // IMPORTANT: divide by 2 for undirected graph
    }
}

/**
 * THEORY OF IMPLEMENTATION - Adjacency List for Directed Graph (with in/out tracking)
 * 
 * This is an alternative (and often better) way to represent a Directed Graph.
 * 
 * WHY ADJACENCY LIST?
 * 1. Instead of a big 2D matrix (n × n space), we store only the actual connections.
 * 2. For each node, we keep two Sets:
 *    - outList[node] = Set of nodes that this node points to (outgoing edges)
 *    - inList[node]  = Set of nodes that point to this node (incoming edges)
 * 
 * ADVANTAGES over Adjacency Matrix:
 * - Much more memory efficient when the graph is sparse (few edges compared to nodes).
 * - Adding/removing nodes and edges is fast.
 * - outDegree and inDegree are O(1) because Set.size is fast.
 * - Removing a node is clean (we update both in and out lists of neighbors).
 * 
 * DISADVANTAGES:
 * - Checking hasEdge(u,v) is O(1) on average (thanks to Set), but slightly slower than matrix O(1).
 * - Finding all neighbors requires converting Set to array (we do [...set]).
 * 
 * KEY DESIGN CHOICES:
 * - Uses generic <T> so nodes can be any type (string, number, object, etc.).
 * - Uses Map<T, Set<T>> because Map preserves insertion order and allows any key type.
 * - Maintains BOTH outList and inList so inNeighbors and inDegree are fast.
 * - removeNode is carefully written to clean up all references (no dangling edges).
 * 
 * This is a high-quality, production-ready implementation for directed graphs.
 */

export class DirectedGraphList<T> {
    // outList: For each node, stores where its arrows go (u → v)
    private outList: Map<T, Set<T>> = new Map();

    // inList: For each node, stores who points to it (u → v means u is in inList[v])
    private inList: Map<T, Set<T>> = new Map();

    /**
     * Adds a node if it doesn't already exist.
     * Creates empty Set for outgoing and incoming edges.
     */
    addNode(node: T): void {
        if (!this.outList.has(node)) {
            this.outList.set(node, new Set());   // outgoing edges
            this.inList.set(node, new Set());    // incoming edges
        }
    }

    /**
     * Adds a directed edge u → v.
     * Updates both outList and inList to keep them consistent.
     */
    addEdge(u: T, v: T): void {
        this.addNode(u);   // ensure both nodes exist
        this.addNode(v);

        this.outList.get(u)!.add(v);   // u now points to v
        this.inList.get(v)!.add(u);    // v now has u as incoming
    }

    /**
     * Removes the directed edge u → v.
     * Cleans up both outList and inList.
     */
    removeEdge(u: T, v: T): void {
        this.outList.get(u)?.delete(v);   // remove from outgoing
        this.inList.get(v)?.delete(u);    // remove from incoming
    }

    /**
     * Completely removes a node and all its edges.
     * 
     * Step-by-step:
     * 1. For every node that this node points to (outgoing), remove this node from their inList.
     * 2. For every node that points to this node (incoming), remove this node from their outList.
     * 3. Finally delete the node from both maps.
     */
    removeNode(node: T): void {
        // Clean up: tell all my outgoing targets that I no longer point to them
        this.outList.get(node)?.forEach(v => {
            this.inList.get(v)?.delete(node);
        });

        // Clean up: tell all my incoming sources that I no longer exist
        this.inList.get(node)?.forEach(u => {
            this.outList.get(u)?.delete(node);
        });

        // Remove the node itself
        this.outList.delete(node);
        this.inList.delete(node);
    }

    /**
     * Checks if there is a directed edge u → v.
     */
    hasEdge(u: T, v: T): boolean {
        return this.outList.get(u)?.has(v) ?? false;
    }

    /**
     * Returns all nodes that u points to (outgoing neighbors).
     */
    outNeighbors(node: T): T[] {
        return [...(this.outList.get(node) ?? [])];   // convert Set to array
    }

    /**
     * Returns all nodes that point to this node (incoming neighbors).
     */
    inNeighbors(node: T): T[] {
        return [...(this.inList.get(node) ?? [])];
    }

    /**
     * Number of outgoing edges from this node.
     */
    outDegree(node: T): number {
        return this.outList.get(node)?.size ?? 0;
    }

    /**
     * Number of incoming edges to this node.
     */
    inDegree(node: T): number {
        return this.inList.get(node)?.size ?? 0;
    }

    /**
     * Returns list of all nodes in the graph.
     */
    nodes(): T[] {
        return [...this.outList.keys()];   // Map.keys() gives all nodes
    }

    /**
     * Total number of directed edges in the entire graph.
     * Counts by summing the size of every outList Set.
     */
    edgeCount(): number {
        let sum = 0;
        this.outList.forEach(s => (sum += s.size));
        return sum;
    }
}

const ug = new UndirectedGraphList<string>();
ug.addEdge('A', 'B'); ug.addEdge('A', 'C');
ug.addEdge('B', 'D'); ug.addEdge('C', 'D');
console.log(ug.neighbors('A'));  // ['B', 'C']

const dg = new DirectedGraphList<string>();
dg.addEdge('A', 'B'); dg.addEdge('B', 'C');
dg.addEdge('A', 'C');
console.log(dg.outNeighbors('A'));    // ['B', 'C']
console.log(dg.inNeighbors('C'));     // ['B', 'A']