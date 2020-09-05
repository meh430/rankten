import * as api from './RankApi';

export async function getUser(name) {
    var response = await api.get('/users/' + name);
    return response;
}

export async function updateBio(bio, token) {
    var response = await api.put('/users', token, { 'bio': bio });
    return response;
}

export async function updateProfilePic(profPic, token) {
    var response = await api.put('/users', token, { 'prof_pic': profPic });
    return response;
}