const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

const {login, register} = require('./controllers/auth.js')
const {addPost, getAllPosts, getCurrentUserPosts, editPost, deletePost} = require('./controllers/posts.js')

app.post('/register', register)
app.post('/login', login)
app.post('/posts', addPost)

app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)

app.put('/posts/:id', editPost)

app.delete('/posts/:id', deletePost)


app.listen(PORT, () => console.log(`Running on Port ${PORT}`))