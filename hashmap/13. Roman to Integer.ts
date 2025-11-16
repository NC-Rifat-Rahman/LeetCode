function romanToInt(s: string): number {
    const romanToValueMap: Map<string, number> = new Map<string, number>();

    const symbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    const values  = [   1,   5,  10,  50, 100, 500, 1000];

    for(let i=0;i<symbols.length;i++){
        romanToValueMap.set(symbols[i], values[i]);
    }

    let total = 0;
    let prevValue = 0;

    for (let i = s.length - 1; i >= 0; i--){
        const currentChar: string = s[i];
        const currentValue: any = romanToValueMap.get(currentChar)

        if(currentValue < prevValue){
            total = total - currentValue;
        }
        else{
            total = total + currentValue;
        }

        prevValue = currentValue;
        
    }

    return total;
};