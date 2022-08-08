const Item = require('../models/Item');
const Comment = require('../models/Comment');


async function getAll(query) {
    if (query) {
        const userId = query.split('=')[1].slice(1, -1);
        return Item.find({ owner: userId });
    }
    return Item.find({});
}

async function create(item) {
    const result = new Item({
        type: item.type,
        name: item.name,
        birthYear: item.birthYear,
        city: item.city,
        neighborhood: item.neighborhood,
        dataLost: item.dataLost,
        img: item.img,
        description: item.description,
        likes: [],
        owner: item.owner,
        comments: []
    });

    await result.save();

    return result;
}

async function getById(id) {
    return Item.findById(id);
}

async function updateById(existing, item) {

    existing.name = item.name,
        existing.img = item.img,
        existing.dataLost = item.dataLost,
        existing.city = item.city,
        existing.neighborhood = item.neighborhood,
        existing.birthYear = item.birthYear,
        existing.description = item.description,
        existing.type = item.type,
        existing.owner = existing.owner;
    existing.likes = existing.likes;
    existing.comments = existing.comments;
    await existing.save();


    return existing;
}

async function like(userId, id) {
    const item = await Item.findById(id);

    if (userId && !item.likes.includes(userId)) {
        item.likes.push(userId)
    } else {
        throw ("You can't like this item again")
    }

    await item.save();

    return item;
}

async function unlike(userId, id) {
    const item = await Item.findById(id);

    if (userId && item.likes.includes(userId)) {
        const index = item.likes.indexOf(userId);
        if (index > -1) {
            item.likes.splice(index, 1);
        }
    }

    await item.save();

    return item;
}

async function deleteById(id) {
    const item = await Item.findByIdAndDelete(id);
    return Item.find({});
}

async function comments(id, data) {

    const item = await Item.findById(id);
    console.log('COMMENTS  ' + data)

    item.comments.push(data);
    await item.save();
    console.log('COMMENTS  ' + item)
    return item;
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    like,
    unlike,
    deleteById,
    comments
};