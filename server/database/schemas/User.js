const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    roles: Array [UUID],
    history: UUID,
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    status: String
})

module.exports = mongoose.model("User", userSchema)
