function reverseBits(n: number): number {
    let ans = 0;

    for (let i = 0; i < 32; i++) {
        let bit = (n & 1) << (31 - i)

        ans |= bit;

        n = n >> 1;
    }

    return ans;
};