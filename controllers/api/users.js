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
        res.status(400).json('Failed to create user.')
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
        res.status(422).json('Incorrect Username or Password')
    }
}

async function savePost(req, res, next) {
    const postId = req.params.postId
    try {
        const user = await User.findById(req.user._id)
        if (user.savedResources.includes(postId)){
            user.savedResources.remove(postId)
        } else{
            user.savedResources.push(postId)
        }
        await user.save()
        res.json(user)
    } catch(err) {
        res.status(400).json('Failed to save post')
    }
}

async function getSavedResources(req, res, next) {
    try {
        const user = await User.findById(req.user._id)
        await user.populate('savedResources')
        await user.populate('comments')
        await user.populate({path: 'comments', populate: 'postId'})
        res.json({ comments: user.comments, savedResources: user.savedResources })
    } catch(err) {
        res.status(400).json('Unable to retrieve Data')
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

module.exports = {
    create,
    logIn,
    checkToken,
    savePost,
    getSavedResources
}
