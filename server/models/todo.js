const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const TodoSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            index: true,
        },
        title:{
            type: String,
            minlength: 2,
            maxlength: 32,
            trim: true,
            index: true
        },
        description: {
            type: String,
            maxlength: 300,
        },
        date:{
            type: String,
            index: true,
        },
        done:{
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Todo", TodoSchema)