/** 
 * Check three conditions:
    1. n > 0: Powers of four must be positive
    2. (n & (n - 1)) === 0: This checks if n is a power of two
       - Powers of two have only one bit set in binary representation
       - When we subtract 1, all bits after that single bit become 1
       - ANDing them results in 0
    3. (n & 0xAAAAAAAA) === 0: This filters out powers of two that aren't powers of four
       - 0xAAAAAAAA in binary is 10101010101010101010101010101010
       - Powers of four have their single bit at even positions (0, 2, 4, 6...)
       - This mask has 1s at all odd positions, so ANDing with powers of four gives 0
**/
function isPowerOfFour(n: number): boolean {
    if (n <= 0)
        return false;

    return (n & (n - 1)) === 0 && (n & 0xAAAAAAAA) === 0;
};