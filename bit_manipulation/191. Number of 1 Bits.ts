function hammingWeight(n: number): number {
    let count = 0;

    while (n > 0) {
        if (n % 2 === 1) {
            count++;
        }
        n = n >> 1;
    }
    return count;
};