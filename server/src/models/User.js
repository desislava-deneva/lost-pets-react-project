const { Schema, model, Types: { ObjectId } } = require('mongoose');



const userSchema = new Schema({
    name: {type: String, required: true, minlength: [3, 'Names must be leat 3 charecters']},
    username: { type: String, required: true, minlength: [5, 'Username must be leat 5 charecters '] },
    hashedPassword: { type: String },
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;

// const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
// const USERNAME_PATTERN = /^[A-Z][a-z]+ [A-Z][a-z]+$/
