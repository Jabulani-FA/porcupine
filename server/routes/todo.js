const express = require('express')
const router = express.Router()

// middlewares to check authentication
const {authCheck} = require('../middleware/auth')

// controlller api's for the crud operations for todos
const {CreateTodo, getTodos, getTodo, updateTodo, deleteTodo, todoDone} = require('../controllers/todo')


router.post('/create-todo', authCheck, CreateTodo)
router.post('/get-todos', authCheck, getTodos)
router.post('/get-todo/:id', authCheck, getTodo)
router.post('/todo-done/:id', authCheck, todoDone)
router.put('/edit-todo/:id', authCheck, updateTodo)
router.delete('/delete-todo/:id', authCheck, deleteTodo)

module.exports = router