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
        hashedPassword,
        img: ""
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
    const payload = {
        name: '',
        username: '',
        _id: '',
        img: '',
        token
    };
    blacklist.add(payload);
}

function createSession(user) {
    const payload = {
        name: user.name,
        username: user.username,
        _id: user._id,
        img: user.img
    };

    const accessToken = jwt.sign(payload, JWT_SECRET);

    return {
        name: user.name,
        username: user.username,
        accessToken,
        _id: user._id,
        img: user.img
    };
}

function validateToken(token) {
    // if (blacklist.has(token)) {
    //     throw new Error('Token is blacklisted');
    // }
    return jwt.verify(token, JWT_SECRET);
}

async function updateUserInfo(id, newUser) {
    const user = await User.findById(id);
    if (!id) {
        throw new Error('Id not existing');
    }
    
    const isExistingThisUsername = await User.findOne({ username: new RegExp(`^${newUser?.username}$`, 'i') });

    if (isExistingThisUsername && isExistingThisUsername.username && newUser.hasOwnProperty('username')) {
        if (isExistingThisUsername.username == newUser?.username && newUser._id != isExistingThisUsername._id) {
            throw new Error('Username is taken');
        }
    }

    if (newUser?.username && newUser?.name && newUser?.img) {
        user.name = newUser.name;
        user.username = newUser.username;
        user.accessToken = user.accessToken;
        user._id = user._id;
        user.img = newUser.img
        await user.save();
    } else {

        if (newUser?.username) {
            user.username = newUser.username;
        }
        if (newUser?.name) {
            user.name = newUser.name;
        }

        if (newUser?.img) {
            user.img = newUser.img
        }

        user.accessToken = user.accessToken;
        user._id = user._id;
        await user.save();
        return user;

    }

    return user;


}

async function getUserByUsername(username, req) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    return user;
}

module.exports = {
    register,
    login,
    logout,
    validateToken,
    updateUserInfo,
    getUserByUsername
};