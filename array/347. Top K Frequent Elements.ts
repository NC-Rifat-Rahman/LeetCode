/*
    -Create a map, with the value and occurrences as key, value pair
    -Somehow sort according to the descending order of their occurrences and also include these cases, if you wish to
    Case1. if two elements have same occurrences print the elements lexicographically(if strings) or ascending order of the numbers(if integers)
    Case 2: if the occurrences are distinct, print in descending order of the occurrences of the elements.
    -Return the first K elements.
*/

function topKFrequent(nums: number[], k: number): number[] {
    let freqMap = new Map<number, number>();

    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let res = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);

    return res.slice(0, k).map(([num]) => num);
}