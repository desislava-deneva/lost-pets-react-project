const Item = require('../models/Item');


async function getAll(query) {
    if (query) {
        const userId = query.split('=')[1].slice(1, -1);
        console.log(userId)
        return Item.find({ owner: userId });
    }
    return Item.find({});
}

async function create(item) {
    const result = new Item({
        type: item.type,
        name: item.name,
        birthYear:item.birthYear,
        city: item.city,
        neighborhood: item.neighborhood,
        dataLost: item.dataLost,
        img: item.img,
        description: item.description,
        owner: item.owner
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
        existing.owner = existing.owner
        await existing.save();


    return existing;
}

async function deleteById(id) {
    const item = Item.findByIdAndDelete(id);
    console.log(item)
    return await Item.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
};