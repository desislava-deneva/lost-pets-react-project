const { validateToken } = require('../services/user');


module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const payload = validateToken(token);
            console.log(payload)
            req.user = {
                username: payload.username,
                name: payload.name,
                _id: payload._id,
                token,
                img: payload.img
            };
            console.log(req.user)

        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Invalid access token. Please log in' });
        }
    }

    next();
};