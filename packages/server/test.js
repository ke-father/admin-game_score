const { v4: uuidv4 } = require('uuid')

const id = uuidv4().slice(0, 8)
console.log(id)
