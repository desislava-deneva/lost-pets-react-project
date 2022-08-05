const { model, Schema, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const itemSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'The Name should be at least 2 characters'] },
    type: { type: String, required: true, enum: ['Dog', 'Cat'] },
    birthYear: { type: Number, required: true, min: [2000, 'Year must be min 2000'], maxlength: [2022, 'Year must be max 2022'] },
    city: { type: String, required: true, minlength: [3, 'The City should be at least 3 characters long'] },
    neighborhood: { type: String, required: true, minlength: [3, 'The Neighborhood should be at least 3 characters long'] },
    dataLost: { type: String, required: true, minlength: [10, 'The Date should be at 10 characters long'] },
    img: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid URL'
        }
    },
    description: { type: String, default: ' ', maxlength: [500, 'Description must be max 500 characters long'] },
    likes: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User', required: true }, 
});

const Item = model('Item', itemSchema);

module.exports = Item;