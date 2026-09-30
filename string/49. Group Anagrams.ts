/**
 * Two strings are anagrams if and only if they contain exactly the same
 * characters with the same frequencies.
 *
 * Instead of sorting every string (O(k log k)), we build a frequency
 * signature of the 26 lowercase English letters and use that signature
 * as a key in a hash map. All strings that produce the identical
 * signature are anagrams of each other and are therefore collected
 * into the same group.
 *
 * Time  : O(n * k)   – n = number of strings, k = max length of a string
 * Space : O(n * k)   – we store all original strings + the map
 */
function groupAnagrams(strs: string[]): string[][] {

    // Map from "frequency signature" → list of original strings
    // that share that signature.
    const res = new Map<string, string[]>();

    // Process every string in the input array.
    for (const s of strs) {

        // ---------------------------------------------------------------
        // 1. Build the frequency count of the current string.
        //    count[0] = number of 'a's
        //    count[1] = number of 'b's
        //    ...
        //    count[25] = number of 'z's
        // ---------------------------------------------------------------
        const count = new Array(26).fill(0);

        for (const c of s) {
            // Convert character to its 0-based index in the alphabet.
            // 'a' → 0, 'b' → 1, ..., 'z' → 25
            const index = c.charCodeAt(0) - 'a'.charCodeAt(0);
            count[index]++;
        }

        // ---------------------------------------------------------------
        // 2. Turn the count array into a unique string key.
        //    Arrays cannot be used directly as Map keys (reference equality),
        //    so we join the numbers with a separator that never appears
        //    in the numbers themselves ('#').
        //
        //    Example for "eat":
        //      count = [1,0,0,0,1,0,...,1,...0]
        //      key   = "1#0#0#0#1#0#...#1#...#0"
        // ---------------------------------------------------------------
        const key = count.join('#');

        // ---------------------------------------------------------------
        // 3. Group the original string under this key.
        //    First time we see the key → create a new empty list.
        //    Always append the original string to the list.
        // ---------------------------------------------------------------
        if (!res.has(key)) {
            res.set(key, []);
        }
        res.get(key)!.push(s);
    }

    // ---------------------------------------------------------------
    // 4. The values of the map are exactly the groups of anagrams.
    //    Order of groups (and order inside each group) does not matter.
    // ---------------------------------------------------------------
    return Array.from(res.values());
}