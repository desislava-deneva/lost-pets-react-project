const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const blacklist = new Set();

const JWT_SECRET = 't gcsergcserg  b920n3w4pc[w3tcawert6v9';

async function register(name, username, password) {
    // check if username is taken
    const existing = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

    if (existing) {
        throw new Error('Username is taken');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // store user
    const user = new User({
        name,
        username,
        hashedPassword
    });

    await user.save();

    return createSession(user);
}

async function login(username, password) {
    // check if user exists
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    // verify password
    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return createSession(user);
}

function logout(token) {
    blacklist.add(token);
}

function createSession(user) {
    const payload = {
        username: user.username,
        _id: user._id
    };

    const accessToken = jwt.sign(payload, JWT_SECRET);

    return {
        name: user.name,
        username: user.username,
        accessToken,
        _id: user._id
    };
}

function validateToken(token) {
    // if (blacklist.has(token)) {
    //     throw new Error('Token is blacklisted');
    // }
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    logout,
    validateToken
};