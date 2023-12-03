const multiplication = (matrix1, matrix2) => {
    const result = []
    for (let j = 0; j < matrix1.length; j++) {
        let sum = 0
        for (let i = 0; i < matrix2.length; i++) {
            sum =+ matrix1[i] * matrix2[i][j]
        }
        result.push(sum)
    }
    return result
}

export default multiplication