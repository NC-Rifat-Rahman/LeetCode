function searchInsert(nums: number[], target: number): number {
    let low = 0;

    let high = nums.length - 1;
    let ans = 0;

    while (high >= low) {
        const mid = low + Math.floor((high - low) / 2);

        if (target === nums[mid]) {
            ans = mid;
            return ans;
        }
        else if (target < nums[mid]) {
            high = mid - 1;
        }
        else if (target > nums[mid]) {
            low = mid + 1
        }
    }

    return low;
};
