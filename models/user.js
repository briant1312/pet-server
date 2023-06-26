const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const SALT_ROUNDS = 6

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
    notifications: [{
        type: String,
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        default: "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    savedResources: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, user){
            delete user.password
            return user
        }
    }
})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})

module.exports = mongoose.model('User', userSchema)
