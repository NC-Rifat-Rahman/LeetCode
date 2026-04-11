function findCenter(edges: number[][]): number {
    const [a, b] = edges[0];

    if (a === edges[1][0] || a === edges[1][1])
        return a;

    return b;
};