/**
 * APPROACH: Reverse Thinking — Mark the Safe 'O's First
 *
 * Instead of trying to identify which 'O' regions ARE surrounded (hard),
 * we flip the problem: identify which 'O's are NOT surrounded (easy),
 * and capture everything else.
 *
 * Key insight: any 'O' that is on the board's border, or connected to a
 * border 'O', can NEVER be captured. Every other 'O' must be captured.
 *
 * Step 1 — Mark safe 'O's as 'T':
 *   Run DFS from every 'O' on the four edges. Every 'O' reachable from
 *   the edge is safe; mark it 'T' (temporary) so we don't lose track.
 *
 * Step 2 — Capture surrounded 'O's:
 *   Any 'O' still on the board was never reachable from an edge, so it
 *   is fully surrounded. Overwrite it with 'X'.
 *
 * Step 3 — Restore safe 'O's:
 *   Convert every 'T' back to 'O', leaving the border-connected regions
 *   untouched.
 *
 * Time:  O(m * n) — every cell is visited at most once by DFS
 * Space: O(m * n) — implicit call stack in the worst case (all 'O' board)
 */
function solve(board: string[][]): void {
    const numberOfRows = board.length;
    const numberOfCols = board[0].length;

    function dfsCapture(r: number, c: number) {
        if (r < 0 || c < 0 || r === numberOfRows || c === numberOfCols ||
            board[r][c] !== "O") {
            return;
        }

        board[r][c] = "T";

        dfsCapture(r + 1, c);
        dfsCapture(r - 1, c);
        dfsCapture(r, c + 1);
        dfsCapture(r, c - 1);
    }

    // Step 1: mark all border-connected 'O's as 'T'
    for (let r = 0; r < numberOfRows; r++) {
        for (let c = 0; c < numberOfCols; c++) {
            if (board[r][c] === "O" &&
                (r === 0 || r === numberOfRows - 1 || c === 0 || c === numberOfCols - 1)) {
                dfsCapture(r, c);
            }
        }
    }

    // Step 2: remaining 'O's are surrounded — capture them
    for (let r = 0; r < numberOfRows; r++) {
        for (let c = 0; c < numberOfCols; c++) {
            if (board[r][c] === "O") {
                board[r][c] = "X";
            }
        }
    }

    // Step 3: restore safe 'O's from their temporary 'T' marker
    for (let r = 0; r < numberOfRows; r++) {
        for (let c = 0; c < numberOfCols; c++) {
            if (board[r][c] === "T") {
                board[r][c] = "O";
            }
        }
    }
}