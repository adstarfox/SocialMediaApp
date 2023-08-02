const {User} = require('../models/user')
const {Post} = require('../models/post')


module.exports = {
    addPost: async (req,res) => {
        try {
            const {title, content, status, userId} = req.body
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getAllPosts: (req,res) => {
        console.log('getAllPosts')
        res.sendStatus(200)
    },
    getCurrentUserPosts: (req,res) => {
        console.log('getCurrentUserPosts')
        res.sendStatus(200)
    },
    editPost: (req,res) => {
        console.log('editPost')
        res.sendStatus(200)
    },
    deletePost: (req,res) => {
        console.log('deletePost')
        res.sendStatus(200)
    }
}