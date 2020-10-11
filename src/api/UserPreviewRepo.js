import * as api from './RankApi';

export const UserPreviewTypes = {
    followingList: "FOLLOWING_LIST",
    followersList: "FOLLOWERS_LIST",
    likersList: "LIKERS_LIST",
    searchUsersList: "SEARCH_USERS_LIST"
};

/* 
    params: {
        name: string,
        page: int,
        sort: int,
        query: string,
        refresh: bool
    } 
*/

export async function getFollowing(name) {
    var response = await api.get("/following/" + name);
    return response;
}

export async function getFollowers(name) {
    var response = await api.get("/followers/" + name);
    return response;
}

export async function getLikers(id) {
    var response = await api.get("/like" + id);
    return response;
}

export async function searchUsers(params) {
    var [e, res] = await api.get("/search_users/" + params.page + "/" + params.sort + "?q=" + params.query);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []]
    } else {
        return [e, res.length < 100, res]
    }
}