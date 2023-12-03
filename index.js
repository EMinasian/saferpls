import keySchedule from "./utils/keySchedule.js";

const KEY = [23, 5, 54, 124, 76, 234, 21, 42, 98, 100, 201, 79, 103, 200, 153, 178, 11]

const keys = keySchedule(KEY)

console.log(keys)