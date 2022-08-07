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

export async function getCommentsById(id) {
    return await api.get(host + '/data/catalog/' + id + '/comments');
}

export async function postCommentById(id, comment) {
    return await api.get(host + '/data/catalog/' + id + '/comments', comment);
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
    return await api.get(host + '/users/my-profail' + id);
}

export async function updateUserProfaile(user) {
    const result = await api.put(host + '/users/user-info/' + user.id, user);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('name', result.name);

    return result;
}