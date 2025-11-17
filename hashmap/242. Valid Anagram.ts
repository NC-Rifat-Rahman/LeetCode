function isAnagram(s: string, t: string): boolean {
    let map1: Map<string, number> = new Map();
    let map2: Map<string, number> = new Map();

    if(s.length !== t.length){
        return false;
    }

    for (let i = 0; i < s.length; i++) {
        map1.set(s[i], (map1.get(s[i]) || 0) + 1);
    }

    for (let i = 0; i < t.length; i++) {
        map2.set(t[i], (map2.get(t[i]) || 0) + 1);
    }

    for (const [char, count] of map1) {
        if (map2.get(char) !== count) {
            return false;
        }

    }

    return true;
};