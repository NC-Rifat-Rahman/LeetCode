function isPalindrome(s: string): boolean {
    const lowerCaseString = s.toLowerCase();
    let cleanString = "";

    for(let i=0;i<lowerCaseString.length;i++){
        const currentChar = lowerCaseString[i];

        if((currentChar>='a' && currentChar<='z') || (currentChar>='0' && currentChar<='9') ){
            cleanString+=currentChar;
        }
    }

    let left = 0;
    let right = cleanString.length-1;

    while(left<right){
        if(cleanString[left] !== cleanString[right]){
            return false;
        }
        left++;
        right--;
    }
    return true
};
