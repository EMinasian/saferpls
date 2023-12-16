import keySchedule from "./utils/keySchedule.js";
import encrypt from './encryption.js'

const KEY = [23, 5, 54, 124, 76, 234, 21, 42, 98, 100, 201, 79, 103, 200, 153, 178, 11]
const input = [123, 51, 254, 24, 176, 34, 1, 242, 8, 10, 25, 59, 113, 60, 72, 78, 92]


const keys = keySchedule(KEY)
const encrypted = encrypt(keys, input)

console.log(encrypted)