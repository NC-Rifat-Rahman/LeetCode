function hammingDistance(x: number, y: number): number {
    let xorValue = x ^ y;
    let count = 0;

    while (xorValue > 0) {
        if (xorValue % 2 === 1) {
            count++;
        }
        xorValue = xorValue >> 1;
    }

    return count;
};