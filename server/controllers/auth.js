const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

const createToken = (username, id) => {
    return jwt.sign(
        {
            username,
            id
        },
        SECRET,
        {
           expiresIn: '2 days' 
        }
    )
}

module.exports = {
    login: async (req, res) => {
        console.log('login')
        let {username, password} = req.body
        let token = createToken(username, password)
        res.status(200).send(token)
    },
    register: async (req,res) => {
        console.log('register')
        res.status(200)
    }
}