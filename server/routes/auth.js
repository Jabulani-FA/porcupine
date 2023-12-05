const express = require('express')
const router = express.Router()

// middlewares to check authentication
const {authCheck} = require('../middleware/auth')

// controlller api's for the crud operations for todos
const {CreateUser, CurrentUser, deleteUser} = require('../controllers/auth')


router.post('/create-user', authCheck, CreateUser)
router.post('/current-user', authCheck, CurrentUser)
router.delete('/delete-user', authCheck, deleteUser)

module.exports = router