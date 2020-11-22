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

export const getFollowing = async (name) => await api.get("/following/" + name);

export const getFollowers = async (name) => await api.get("/followers/" + name);

export const getLikers = async (id) => await api.get("/like/" + id);

export async function searchUsers(params) {
    const [e, res] = await api.get("/search_users/" + params.page + "/" + params.sort + "?q=" + params.query);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []];
    } else if (res.length === 100) {
        const [e1, res1] = await api.get(
            "/search_users/" + (params.page + 1) + "/" + params.sort + "?q=" + params.query
        );
        return res1.includes("Page") ? [false, true, res] : [e1, false, res];
    } else {
        return [e, res.length < 100, res];
    }
}
