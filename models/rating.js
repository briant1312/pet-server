const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})

module.exports = ratingSchema
