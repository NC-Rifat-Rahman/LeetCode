// O(n^2)
function twoSum(nums: number[], target: number): number[] {
    let ans: number[] = [];

    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                ans[0] = i;
                ans[1] = j;
                break;
            }
        }
    }
    return ans;
};