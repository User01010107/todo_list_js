const express = require('express')
const { createTodo, getTodos, updateTodo, completeTodo, deleteTodo } = require('../controllers/todoControllers')
const router = express.Router()
const db = require('../db')


router.get('/todos', getTodos)

router.post('/todos/create', createTodo)

router.put('/todos/:id', updateTodo)

router.patch('/todos/:id', completeTodo)

router.delete('/todos/:id', deleteTodo)

module.exports = router