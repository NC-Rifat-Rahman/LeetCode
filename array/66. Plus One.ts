/**
 * Approach:
 * 1. Convert the digits array into a string to form the full number.
 * 2. Use BigInt to safely handle very large integers (avoids overflow issues of JS number).
 * 3. Increment the number by 1 using BigInt arithmetic.
 * 4. Extract digits from the updated number:
 *    - Use modulo (num % 10n) to get the last digit.
 *    - Divide by 10n to remove the last digit.
 *    - Repeat until the number becomes 0.
 * 5. Store extracted digits in reverse order, then reverse the result array.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function plusOne(digits: number[]): number[] {
    let digitsToString: string = "";

    for (let i = 0; i < digits.length; i++) {
        digitsToString = digitsToString + digits[i].toString();
    }

    let num = BigInt(digitsToString);

    num = num + 1n;

    let res: number[] = [];
    let i = 0;

    while (num > 0n) {
        res[i] = Number(num % 10n);
        num = num / 10n;
        i++;
    }
    return res.reverse();
};