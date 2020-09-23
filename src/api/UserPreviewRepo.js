import * as api from './RankApi';
/* 
    params: {
        id: string,
        name: string,
        page: int,
        sort: int,
        query: string,
        refresh: bool
    } 
*/

export async function getFollowing(params) {
    var response = await api.get("/following/" + params.name);
    return response;
}

export async function getFollowers(params) {
    var response = await api.get("/followers/" + params.name);
    return response;
}

export async function getLikers(params) {
    var response = await api.get("/like" + params.id);
    return response;
}

export async function searchUsers(params) {

}