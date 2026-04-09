function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const adj: Map<number, number[]> = new Map();

    for (let i = 0; i < n; i++) {
        adj.set(i, []);
    }

    for (const [u, v] of edges) {
        adj.get(u)!.push(v);
        adj.get(v)!.push(u);
    }

    const visited: Set<number> = new Set();
    const stack: number[] = [source];

    while (stack.length) {
        const node: number = stack.pop()!;

        if (node === destination)
            return true;

        if (visited.has(node))
            continue;

        visited.add(node);

        for (const neighbor of adj.get(node)!) {
            if (!visited.has(neighbor))
                stack.push(neighbor);
        }
    }
    return false;
};