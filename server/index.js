const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4005
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

const {login, register} = require('./controllers/auth.js')
const {addPost, getAllPosts, getCurrentUserPosts, editPost, deletePost} = require('./controllers/posts.js')
const {isAuthenticated} = require('./middleware/isAuthenticated.js')


app.post('/register', register)
app.post('/login', login)
app.post('/posts', isAuthenticated, addPost)

app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)

app.put('/posts/:id', isAuthenticated, editPost)

app.delete('/posts/:id',isAuthenticated, deletePost)

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`)) 
}).catch(err => console.log(err))
