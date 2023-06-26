const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text:{
        type: String,
        required: true,
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }
})

module.exports = mongoose.model('Comment', commentSchema)