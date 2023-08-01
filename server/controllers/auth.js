const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET
const {User} = require('../models/user')
const bcrypt = require('bcryptjs')

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
        try{
            const {username, password} = req.body
            let foundUser = await User.findOne({where: {username: username}})

            if (!foundUser){
                res.status(400).send('Invalid entry. Try again')
            } else {

                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

                if (isAuthenticated){
                    let token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
    
                    const data = {
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        token: token,
                        exp: exp
                    }
                    res.status(200).send(data)
                } else {
                    res.status(400).send('Invalid Password')
                }
            }
        }
        catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    register: async (req,res) => {
        try{
            const {username, password} = req.body
            let foundUser = await User.findOne({where: {username: username}})

            if (foundUser){
                res.status(400).send('User already exists try a different name')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                let newUser = await User.create({username: username, hashedPass: hash})

                let token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48

                const data = {
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token: token,
                    exp: exp
                }
                res.status(200).send(data)
            }
        }
        catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
}