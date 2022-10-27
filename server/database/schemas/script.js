const mongoose = require("mongoose")
const User = require("./User")

run()
async function run() {
const user = new User({name: "Dan", age: 21 })
await user.save().then(() => console.log("User Saved"))
console.log(user)
} 
