const api = require('../services/user');

const router = require('express').Router();


router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const result = await api.register(name, username, password);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await api.login(username, password);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/my-profail/:id', async (req, res) => {
    console.log(req);
    const { user } = req.body;
    try {
        const result = await api.getUserByUsername(user.username);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    api.logout(req.user.token);
    res.status(204).end();
});

module.exports = router;
