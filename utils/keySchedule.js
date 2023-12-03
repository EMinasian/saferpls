import { BIAS_WORDS, ROUNDS } from "./consts/values.js";

const rotate3Bits = (keyRegister) => {
    const tempBits = []
    keyRegister.forEach(byte => {
        const binaryString = byte.toString(2).padStart(8, '0');
        const bitsArray = binaryString.split('').map(Number);
        bitsArray.forEach(bit => tempBits.push(bit))
    })

    const tempRotatedBits = []
    tempBits.forEach((bit, index) => tempRotatedBits[(index - 3) % tempBits.length] = bit)

    let tempByte = []
    const result = []
    for(let i = 0; i < tempRotatedBits.length; i++) {
        if (i % 8 === 0 && i !== 0) {
            result.push(Number(tempByte.join('')))
            tempByte = []
        }
        tempByte.push(tempRotatedBits[i % 8])
    }

    return result
}

const calculateKey = (pos, keyRegister) => {
    const biasWord = BIAS_WORDS[pos + 1]
    const roundKey = []
    for(let i = 0; i < keyRegister.length - 1; i++) {
        const value = (biasWord[i] + keyRegister[(i + pos) % keyRegister.length]) % 256
        roundKey.push(value)
    }
    return roundKey
}

const keySchedule = (userKey) => {

    const keys = [userKey]
    let keyRegister = []

    //constrct initial registery
    let lastByte = 0
    userKey.forEach(byte => {
        keyRegister.push(byte)
        lastByte ^= byte
    })
    keyRegister.push(lastByte)

    // compute other keys
    for (let i = 1; i < 2 * ROUNDS + 1; i++) {
        const rotatedKeyRegister = rotate3Bits(keyRegister)
        const key = calculateKey(i, rotatedKeyRegister)
        keys.push(key)
    }
    
    return keys
}

export default keySchedule