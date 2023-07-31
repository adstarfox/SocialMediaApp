module.export = {
    addPost: (req,res) => {
        console.log('addPost')
        res.sendStatus(200)
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