function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(" ");

    if(words.length !== pattern.length){
        return false;
    }

    const charToWord = new Map<string,string>();
    const wordToChar = new Map<string,string>();

    for(let i = 0; i< pattern.length; i++){
        const c = pattern[i];
        const w = words[i];

        if(charToWord.has(c)){
            if(charToWord.get(c) !== w){
                
                return false;
            }
        }else {
            charToWord.set(c,w)
        }

        if(wordToChar.has(w)){
            if(wordToChar.get(w) !== c){
                return false;
            }
        }else {
            wordToChar.set(w,c)
        }
    }

    return true;
    
};