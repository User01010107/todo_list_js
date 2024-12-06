const express = require('express')
const { errorHandler } = require('./moddleware/errorMiddleware')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api',require('./routes/todoRoutes'))
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
 })

