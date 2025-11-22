function findTheDifference(s: string, t: string): string {
    const map: Map<string, number> = new Map();

    for (let i = 0; i < t.length; i++) {
        map.set(t[i], (map.get(t[i]) || 0) + 1);
    }

    for (let i = 0; i < s.length; i++) {
        map.set(s[i],map.get(s[i])!-1)
    }

    for (const [char, count] of map) {
        if (count === 1) {
            return char;
        }
    }

    return "";
};