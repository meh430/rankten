import * as api from './RankApi';

export const UserPreviewTypes = {
    followingList: "FOLLOWING_LIST",
    followersList: "FOLLOWERS_LIST",
    likersList: "LIKERS_LIST",
    searchUsersList: "SEARCH_USERS_LIST"
};

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
    var [e, res] = await api.get("/search_users/" + params.page + "/" + params.sort + "?=" + params.query);
    if (e) {
        return res.includes("page") ? [false, true, []] : [e, false, []]
    } else {
        return [e, res.length < 100, res]
    }
}