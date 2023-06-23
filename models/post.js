const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = require('./comment')

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
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
    comments: [commentSchema],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Post', postSchema)