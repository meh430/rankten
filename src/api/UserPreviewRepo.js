import * as api from './RankApi';
/* 
    params: {
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

}

export async function getLikers(params) {

}

export async function searchUsers(params) {

}