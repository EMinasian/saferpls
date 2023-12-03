import { ROUNDS, MOD_2_ADDITION_INDICES, MATRIX_M } from "./utils/consts/values"
import multiplication from "./utils/matrixMultiplication"

const nonLinearTransformation = (input) => {
    // TODO write the non linear transformation logic
    return input
}


const encrypt = (keys, input, round) => {

    if (round > ROUNDS) {
        return input
    }

    //the addition operation
    const subKey1 = keys[2 * round - 1]
    const additionResult = []
    input.forEach((element, index) => {
        if (MOD_2_ADDITION_INDICES.includes(index)) {
            additionResult.push(subKey1[index] ^ element)
        } else {
            additionResult.push((subKey1[index] + element) % 256)
        }
    })

    //process by non-linear layer
    const nonLinearTransResult = nonLinearTransformation(additionResult)

    //add 2nd sub-key
    const subKey2 = keys[2 * round]
    const additionResult2 = []
    nonLinearTransResult.forEach((element, index) => {
        if (!MOD_2_ADDITION_INDICES.includes(index)) {
            additionResult2.push(subKey2[index] ^ element)
        } else {
            additionResult2.push((subKey2[index] + element) % 256)
        }
    })

    // matrix multiplication
    const y = multiplication(additionResult2, MATRIX_M)

    return encrypt(keys, y, round++)
}

export default encrypt