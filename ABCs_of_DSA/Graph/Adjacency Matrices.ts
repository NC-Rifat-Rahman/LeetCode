/**
 * THEORY OF IMPLEMENTATION - Adjacency Matrix for Graphs
 * 
 * This code implements two graph classes using the **Adjacency Matrix** representation.
 * 
 * WHY ADJACENCY MATRIX?
 * 1. A graph has nodes (vertices) and edges (connections).
 * 2. Instead of storing edges as a list, we use a 2D square table (matrix) of size n × n,
 *    where n = number of nodes.
 * 3. matrix[i][j] = 1  means there is an edge between node i and node j.
 *    matrix[i][j] = 0  means no edge.
 * 
 * KEY PROPERTIES:
 * - Undirected Graph: Edges are two-way. So if A is connected to B, then B is connected to A.
 *   → The matrix is always **symmetric** (matrix[i][j] === matrix[j][i]).
 * 
 * - Directed Graph: Edges are one-way (u → v). So only matrix[i][j] = 1, not the reverse.
 *   → The matrix is **not symmetric**.
 * 
 * HOW WE GROW THE MATRIX DYNAMICALLY (the clever part):
 * - When we add a new node, the matrix must stay square.
 * - We add one new column to every existing row (forEach + push(0)).
 * - Then we add one completely new row of zeros for the new node.
 * - This keeps matrix.length === nodes.length at all times.
 * 
 * ADVANTAGES of this implementation:
 * - Checking if an edge exists → O(1) time (just look at matrix[i][j]).
 * - Adding/removing edges → O(1).
 * - Finding all neighbors → O(n) (scan one row or one column).
 * - Very easy to understand and debug (you can print the matrix and "see" the graph).
 * 
 * DISADVANTAGES:
 * - Uses O(n²) space (even if there are very few edges).
 * - Adding a node is O(n) because we must resize the matrix.
 */

class UndirectedGraph {
    private nodes: string[] = [];      // List of all node names (in order added)
    private matrix: number[][] = [];   // Adjacency matrix: matrix[i][j] === 1 means edge

    /**
     * Adds a node if it doesn't already exist.
     * Grows the matrix to keep it n × n (square).
     */
    addNode(node: string): void {
        if (this.nodes.includes(node))
            return;

        this.nodes.push(node);

        const n = this.nodes.length;

        // Add a new column (0) to every existing row
        this.matrix.forEach(row => row.push(0));
        // Add a new row of zeros for the new node
        this.matrix.push(new Array(n).fill(0));
    }

    /**
     * Adds an undirected edge (both directions).
     * Automatically adds nodes if they don't exist.
     */
    addEdge(u: string, v: string): void {
        this.addNode(u);
        this.addNode(v);

        const i = this.nodes.indexOf(u);
        const j = this.nodes.indexOf(v);

        this.matrix[i][j] = 1;
        this.matrix[j][i] = 1;   // symmetric because undirected
    }

    /**
     * Removes the undirected edge in both directions.
     */
    removeEdge(u: string, v: string): void {
        const i = this.nodes.indexOf(u);
        const j = this.nodes.indexOf(v);

        if (i === -1 || j === -1)
            return;

        this.matrix[i][j] = 0;
        this.matrix[j][i] = 0;
    }

    /**
     * Checks if there is an edge between u and v.
     */
    hasEdge(u: string, v: string): boolean {
        const i = this.nodes.indexOf(u);
        const j = this.nodes.indexOf(v);

        return i !== -1 && j !== -1 && this.matrix[i][j] === 1;
    }

    /**
     * Returns all nodes directly connected to u.
     */
    neighbors(u: string): string[] {
        const i = this.nodes.indexOf(u);

        if (i === -1)
            return [];

        return this.nodes.filter((__, j) => this.matrix[i][j] === 1);
    }

    degree(u: string): number {
        return this.neighbors(u).length;
    }

    getMatrix(): number[][] {
        return this.matrix;
    }

    getNodes(): string[] {
        return [...this.nodes];   // return a copy
    }
}

class DirectedGraph {
    private nodes: string[] = [];
    private matrix: number[][] = [];

    addNode(node: string): void {
        if (this.nodes.includes(node))
            return;

        this.nodes.push(node);

        const n = this.nodes.length;

        this.matrix.forEach(row => row.push(0));
        this.matrix.push(new Array(n).fill(0));
    }

    /**
     * Adds a directed edge u → v (only one direction).
     */
    addEdge(u: string, v: string): void {
        this.addNode(u);
        this.addNode(v);

        const i = this.nodes.indexOf(u);
        const j = this.nodes.indexOf(v);

        this.matrix[i][j] = 1;   // only one direction
    }

    removeEdge(u: string, v: string): void {
        const i = this.nodes.indexOf(u);
        const j = this.nodes.indexOf(v);

        if (i === -1 || j === -1)
            return;

        this.matrix[i][j] = 0;
    }

    hasEdge(u: string, v: string): boolean {
        const i = this.nodes.indexOf(u);
        const j = this.nodes.indexOf(v);

        return i !== -1 && j !== -1 && this.matrix[i][j] === 1;
    }

    /**
     * Nodes that u points to (outgoing).
     */
    outNeighbors(u: string): string[] {
        const i = this.nodes.indexOf(u);
        if (i === -1)
            return [];

        return this.nodes.filter((_, j) => this.matrix[i][j] === 1);
    }

    /**
     * Nodes that point to u (incoming).
     */
    inNeighbors(u: string): string[] {
        const j = this.nodes.indexOf(u);
        if (j === -1)
            return [];

        return this.nodes.filter((_, i) => this.matrix[i][j] === 1);
    }

    inDegree(u: string): number { return this.inNeighbors(u).length; }
    outDegree(u: string): number { return this.outNeighbors(u).length; }

    getMatrix(): number[][] { return this.matrix; }
    getNodes(): string[] { return [...this.nodes]; }
}

// ─── Usage Example ─────────────────────────────────────

const ug = new UndirectedGraph();
ug.addEdge('A', 'B'); ug.addEdge('A', 'C');
ug.addEdge('B', 'D'); ug.addEdge('C', 'D');

console.log(ug.getMatrix());
// [[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0]]
console.log(ug.hasEdge('A', 'B'));     // true
console.log(ug.neighbors('A'));        // ['B', 'C']

const dg = new DirectedGraph();
dg.addEdge('A', 'B'); dg.addEdge('B', 'C');
dg.addEdge('C', 'A'); dg.addEdge('A', 'C');

console.log(dg.getMatrix());
// [[0,1,1],[0,0,1],[1,0,0]]
console.log(dg.outNeighbors('A'));     // ['B', 'C']
console.log(dg.inDegree('C'));         // 2