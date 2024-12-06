const db = require('../db')
const {v4: uuidv4} = require('uuid')

const getTodos = (req, res) => {
    db.all('SELECT * from todos', (err,rows) => {
        if(err){
            res.status(400)
            throw new Error('Unable to retrieve data')
        }

        res.status(200).json({todos: rows, message: ''})
    })
}

const getTodo = (req, res) => {
    res.json({message: `todo ID: ${req.params.id}`})
}

const createTodo = (req, res) => {
    //res.json({message: 'create tood'})
    const {value, completed} = req.body
    const id = uuidv4()

    //insert data 
    db.run("INSERT INTO todos(id, title, completed) VALUES(?,?,?)", [id, value, false], err => {
        if (err) {
            res.status(400)
            throw new Error("Cant insert data")
        }
        //Response 
        res.status(201).json({todos: {id, title:value, completed},
        message: "Success"})
    })
}

const updateTodo = (req, res) => {
    const {id} = req.params
    const {value} = req.body

    db.run("UPDATE todos SET title = ? Where id = ?", [value, id]).all(
        "SELECT * FROM todos",
        (err, rows) => {
            if(err){
                res.status(400)
                throw new Error("Cant Update data")
            }

            res.status(200).json({todos: rows, message: `update ${value}`})
        }
    )
}

const completeTodo = (req, res) => {
    const {id} = req.params
    const {completed} = req.body

    db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id]).all(
        "SELECT * FROM todos", (err, rows) => {
            if(err){
                res.status(400)
                throw new Error("Cant Update toggle")
            }

            res.status(200).json({todos: rows, message: `${completed ? "completed": "WIP"}`})
        }
    )
}

const deleteTodo = (req, res) => {
    const {id } = req.params

    //delete
    db.run("DELETE FROM todos WHERE id = ?", [id]).all(
        "SELECT * FROM todos", (err, rows) => {
            if(err){
                res.status(400)
                throw new Error("Cant delete data")
            }
            res.status(200).json({todos: rows, message: "Success"})
        })
}



module.exports = {
    getTodos, getTodo, createTodo, updateTodo, completeTodo, deleteTodo
}