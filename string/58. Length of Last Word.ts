function lengthOfLastWord(s: string): number {
    // Step 1: Reverse the entire string
    // After reversing, the last word of original string becomes the first word
    let reversed = s.split("").reverse().join("");
    
    let count = 0;
    
    for (let i = 0; i < reversed.length; i++) {
        
        // Skip all leading spaces in the reversed string
        // (these are the trailing spaces from the original string)
        if (reversed[i] === " ") {
            continue;
        }
        
        // Now we have reached the first non-space character 
        // which is the start of the last word (in reversed order)
        while (i < reversed.length && reversed[i] !== " ") {
            count++;
            i++;
        }
        
        // Once we finish counting the first word in reversed string,
        // we don't need to check further
        break;
    }
    
    return count;
}