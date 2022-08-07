const { model, Schema, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: ObjectId,
        ref: 'Item'
    }
})

module.exports = model('Comment', commentSchema);