const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    imageUrl: {
        type: String,
        default: "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
    },
    category: {
        type: String,
        enum: ['Grooming', 'Healthcare', 'Nutrition', 'Training', 'Other'],
        required: true
    }
}, {
    timestamps: true
    })


module.exports = mongoose.model('Post', postSchema)
