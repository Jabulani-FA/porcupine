const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            index: true,
        },
        Username:{
            type: String,
            unique: true,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)