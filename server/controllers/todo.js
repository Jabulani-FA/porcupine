const User = require('../models/user')
const Todo = require('../models/todo')

exports.CreateTodo = async (req, res) => {
    //
    const { title, description, date } = req.body.values
    const nuser = await User.find({email: req.user.email}).exec()
    if (nuser){
        const user = nuser[0]._id
        console.log(user)
        try{
            const todo = await new Todo({
                user,
                title,
                description,
                date,
            }).save()
            res.json(todo)
        }catch(err) {
            res.json(err)
        }
    }
}
exports.getTodos = async (req, res) => {
    // 
    const nuser = await User.find({email: req.user.email}).exec()
    const user = nuser[0]._id
    try{
        const todo = await Todo.find({user}).exec()
        res.json(todo)
    }catch(err) {
        res.json(err)
    }
}
exports.todoDone = async (req, res) => {
    try{
        const todo = await Todo.findOneAndUpdate({
            _id: req.params.id
        },{done: true}, {new: true}).exec()
        res.json(todo)
    }
    catch(err) {
        res.json(err)
    }
}
exports.getTodo = async (req, res) => {
    // 
    try{
        const todo = await Todo.findOne({
            _id: req.params.id
        }).exec()
        res.json(todo)
    }
    catch(err) {
        res.json(err)
    }
}
exports.updateTodo = async (req, res) => {
    // 
    const {title, description, date} = req.body.values
    try{
        const todo = await Todo.findOneAndUpdate({
            _id: req.params.id
        },{
            title,
            description,
            date,
        }).exec()
        res.json(todo)
    }
    catch(err) {
        res.json(err)
    }    
}
exports.deleteTodo = async (req, res) => {
    // 
    try{
        const todo = await Todo.findOneAndDelete({
            _id:req.params.id
        }).exec()
        res.json(todo)
    }
    catch(err){
        return res.status(400).send("todo delete Failed")
    }
}

