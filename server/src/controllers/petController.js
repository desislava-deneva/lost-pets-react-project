const router = require('express').Router();

const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/petServices');
const errorMapper = require('../util/errorMapper');


router.get('/', async (req, res) => {
    try {
        res.json(await api.getAll(req.query.where));
    } catch (err) {
        res.status(400).json({ message: 'Bad request' });
    }
});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        type: req.body.type,
        name: req.body.name,
        birthYear: req.body.birthYear,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        dataLost: req.body.dataLost,
        img: req.body.img,
        description: req.body.description,
        owner: req.user._id
    };

    console.log(item)
    try {
        const result = await api.create(item);
        res.json(result);
    } catch (err) {
        console.error(err);
        const message = errorMapper(err);
        res.status(400).json({ message });
    }
});

router.get('/:id', preload(api), (req, res) => {
    res.json(res.locals.item);
});

router.put('/:id', preload(api), isOwner(), async (req, res) => {
    try {
        const result = await api.updateById(res.locals.item, req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Request error' });
    }
});

router.delete('/:id', preload(api), isAuth(), isOwner(), async (req, res) => {
    const id = req.params.id;

    try {
        const result = await api.deleteById(id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: `Item ${id} not found` });
    }
});

router.get('/:id/like', preload(api), isAuth(), async (req, res) => {
    res.json(res.locals.item);
})

router.post('/:id/like', preload(api), isAuth(), async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        const item = await api.like(userId, id);
        res.json(item)
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err });
    }
})

router.post('/:id/unlike', preload(api), isAuth(), async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        const item = await api.unlike(userId, id);
        res.json(item)
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err });
    }
})

module.exports = router;