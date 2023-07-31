const express = require('express')
const cors = require('cors')
const app = express()
const PORT = proccess.env.PORT || 4004

app.use(express.json())
app.use(cors())

const {login, register} = require('./controllers/auth')
const {addPost, getAllPosts, getCurrentUserPosts, editPost, deletePost} = require('./controllers/posts')

app.post('/register', register)
app.post('/login', login)
app.post('/posts', addPost)

app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)

app.put('/posts/:id', editPost)

app.delete('/posts/:id', deletePost)









app.listen(PORT, () => console.log(`Running on Port ${PORT}`))