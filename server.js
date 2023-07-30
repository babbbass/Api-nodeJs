const express = require("express")
const connectDb = require("./config/db")
const dotenv = require("dotenv").config()
const port = 5001

const app = express()

connectDb()

// Middleware handle data request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/post", require("./routes/post.routes"))
app.listen(port, () => console.log(`server start at port ${port}`))
