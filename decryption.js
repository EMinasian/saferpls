import { MATRIX_M_INVERSE, MOD_2_ADDITION_INDICES } from "./utils/consts/values.js"
import multiplication from "./utils/matrixMultiplication.js"

const nonLinearTransformation = (input) => {
    // TODO write the non linear transformation logic
    return input
}

const decrypt = (keys, input, round = 8) => {

    if (round < 1) {
        return input
    }

    const x = multiplication(input, MATRIX_M_INVERSE)

    //subtract 2nd sub-key
    const subKey1 = keys[2 * round]
    const additionResult = []
    x.forEach((element, index) => {
        if (!MOD_2_ADDITION_INDICES.includes(index)) {
            additionResult.push(subKey1[index] ^ element)
        } else {
            additionResult.push((element - subKey1[index]) % 256)
        }
    })

    //process by non-linear layer
    // const nonLinearTransResult = nonLinearTransformation(additionResult)

    //the 2nd subtraction operation
    const subKey2 = keys[2 * round - 1]
    const additionResult2 = []
    // nonLinearTransResult.forEach((element, index) => {
        additionResult.forEach((element, index) => {
        if (MOD_2_ADDITION_INDICES.includes(index)) {
            additionResult2.push(subKey2[index] ^ element)
        } else {
            additionResult2.push((element - subKey2[index]) % 256)
        }
    })

    return decrypt(keys, additionResult2, round - 1)
}

export default decrypt