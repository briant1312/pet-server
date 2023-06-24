const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ratingSchema = require('./rating')

const resourceSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    category: {
        type: String,
        enum: ['Food', 'Training', 'Healthcare', 'Grooming', 'Other'],
        required: true
    },
    url: {
        type: String
    },
    ratings: [ratingSchema]
})

module.exports = mongoose.model('Resource', resourceSchema)
