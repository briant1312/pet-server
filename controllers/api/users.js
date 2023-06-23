const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

function createJWT(user){
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function create(req, res, next) {
    // just for right now I want to see if this is connected
    try {
        const takenUser = await User.findOne({userName: req.body.userName})
        if(takenUser) {
            res.status(400).json(`${takenUser.userName} is already taken`)
        } else {
            const user = await User.create(req.body)
            const token = createJWT( user )
        res.json(token)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}


async function logIn(req, res, next) {
    try {
        const user = await User.findOne({userName: req.body.userName})
        if(!user){
            res.sendStatus(422)
            return
        }
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.json(createJWT(user))
        } else {
            res.sendStatus(422)
            return
        }
    } catch (error) {
        res.status.Code = 422
        throw error
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

module.exports = {
    create,
    logIn,
    checkToken
}
