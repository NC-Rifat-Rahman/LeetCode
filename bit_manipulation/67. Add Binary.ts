function addBinary(a: string, b: string): string {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    const answer: string[] = [];

    while (i >= 0 || j >= 0 || carry) {
        let bitA: number;

        if (i >= 0) {
            bitA = parseInt(a[i]);
        }
        else {
            bitA = 0;
        }
        i--;

        let bitB: number;
        if (j >= 0) {
            bitB = parseInt(b[j]);
        }
        else {
            bitB = 0;
        }
        j--;

        let total = bitA + bitB + carry;

        answer.push((total % 2).toString());
        
        carry = Math.floor(total / 2);
    }
    return answer.reverse().join('');
};