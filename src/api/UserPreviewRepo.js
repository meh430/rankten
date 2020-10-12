import * as api from "./RankApi";

export const UserPreviewTypes = {
    followingList: "FOLLOWING_LIST",
    followersList: "FOLLOWERS_LIST",
    likersList: "LIKERS_LIST",
    searchUsersList: "SEARCH_USERS_LIST",
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
    return await api.get("/following/" + name);
}

export async function getFollowers(name) {
    return await api.get("/followers/" + name);
}

export async function getLikers(id) {
    return await api.get("/like/" + id);
}

export async function searchUsers(params) {
    const [e, res] = await api.get("/search_users/" + params.page + "/" + params.sort + "?q=" + params.query);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []];
    } else {
        return [e, res.length < 100, res];
    }
}
