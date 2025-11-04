function majorityElement(nums: number[]): number {

    if(nums.length === 1){
        return nums[0];
    }
    const maxAppearence = Math.floor(nums.length / 2);

    nums.sort((a,b)=> a - b);

    let ans = 0;
    let count = 0;

    for(let i=0;i<nums.length-1;i++){

        if(nums[i] === nums[i+1]){
            count++;
        }else{
            count = 0;
        }

        if(count>=maxAppearence){
            ans = nums[i]
        }
    }

    return ans;
};


/** ALternative solution
- sort the Array
- return n/2 element  */