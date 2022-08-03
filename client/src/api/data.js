import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests
export async function getPets() {
    return await api.get(host + '/data/catalog');
}

export async function getPetById(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function getLikesById(id) {
    return await api.get(host + '/data/catalog/' + id + '/like');
}

export async function postUnLikesById(id) {
    return await api.post(host + '/data/catalog/' + id + '/unlike');
}

export async function postLikeById(id) {
    return await api.post(host + '/data/catalog/' + id + '/like');
}

export async function getMyPet() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createRecord(data) {
    return await api.post(host + '/data/catalog', data);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/catalog/' + id, data);
}

export async function likes(id, data) {
    return await api.put(host + '/data/catalog/' + id, data);
}


export async function deleteRecord(id) {
    return await api.del(host + '/data/catalog/' + id);
}

export async function getUserByUsername(id) {
    return await api.get(host + '/users/my-profail'+id);
}