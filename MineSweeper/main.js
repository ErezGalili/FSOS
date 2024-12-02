function countMines(matrix, i, j) {
    let mineCount = 0;
    for (let row = i - 1; row <= i + 1; row++) {
        for (let col = j - 1; col <= j + 1; col++) {
            if (matrix[row]!==undefined && matrix[row][col]!==undefined) {
                if (matrix[row][col] === 2) {
                    mineCount++;
                }
            }
        }
    }
    return mineCount;
}
