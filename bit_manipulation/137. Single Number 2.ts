/**
 * Problem: Single Number II (LeetCode 137)
 * 
 * Given an array where every element appears exactly THREE times, except one element 
 * that appears exactly ONCE. Find that single element.
 * 
 * Approach: Bit Manipulation - Count Each Bit Modulo 3
 * 
 * Detailed Explanation with Example:
 * 
 * Input: nums = [2, 2, 3, 2]
 * 
 * Step-by-step breakdown:
 * 
 * Binary Representation:
 *   2  →  0010
 *   2  →  0010
 *   3  →  0011
 *   2  →  0010
 * 
 * We analyze each bit position (from right to left, bit 0 to bit 31):
 * 
 * Bit 0 (Least Significant Bit - value = 1):
 *   2: 0
 *   2: 0
 *   3: 1   ←
 *   2: 0
 *   → Total 1s = 1
 *   → 1 % 3 = 1  → This bit belongs to the single number → Set bit 0 in answer
 * 
 * Bit 1 (value = 2):
 *   2: 1
 *   2: 1
 *   3: 1
 *   2: 1
 *   → Total 1s = 4
 *   → 4 % 3 = 1  → This bit belongs to the single number → Set bit 1 in answer
 * 
 * Bit 2 (value = 4):
 *   2: 0, 2: 0, 3: 0, 2: 0
 *   → Total 1s = 0
 *   → 0 % 3 = 0  → Do NOT set this bit
 * 
 * Bit 3 and higher: All 0s → ignored
 * 
 * Final Answer Construction:
 *   Bit 1 and Bit 0 are set → 0011 binary = 3 (decimal)
 * 
 * Why This Works:
 * 
 * - Any number that appears 3 times contributes a multiple of 3 (3k) to the count of 1s 
 *   in every bit position.
 * - The single number that appears once contributes exactly 1 (or 0) to each of its bits.
 * - Therefore, if count % 3 == 1, that bit MUST come from the single number.
 * 
 * This way, we reconstruct the unique number bit by bit.
 * 
 * Time Complexity: O(32 * n) = O(n)
 * Space Complexity: O(1)
 */

function singleNumber(nums: number[]): number {
    let ans = 0;

    for (let i = 0; i < 32; i++) {
        let count = 0;

        for (let j = 0; j < nums.length; j++) {
            count += (nums[j] >> i) & 1;
        }

        if (count % 3 === 1) {
            ans |= 1 << i;
        }
    }

    return ans;
};