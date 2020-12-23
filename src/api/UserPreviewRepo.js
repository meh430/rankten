import * as api from "./RankApi";

export const UserPreviewTypes = {
    followingList: "FOLLOWING_LIST",
    followersList: "FOLLOWERS_LIST",
    likersList: "LIKERS_LIST",
    searchUsersList: "SEARCH_USERS_LIST",
};

/* 
    params: {
        userId: string,
        page: int,
        sort: int,
        query: string,
        refresh: bool
    } 
*/

const refreshQuery = (refresh = false) => (refresh ? "?re=true" : "");

export const getFollowing = async (userId, refresh = false) =>
    await api.get("/following/" + userId + refreshQuery(refresh));

export const getFollowers = async (userId, refresh = false) =>
    await api.get("/followers/" + userId + refreshQuery(refresh));

export const getLikers = async (listId, refresh = false) => await api.get("/like/" + listId + refreshQuery(refresh));

export async function searchUsers(params, refresh = false) {
    params.query = params.query.replace(/ /g, "+");
    const [e, res] = await api.get(
        "/search_users/" + params.page + "/" + params.sort + "?q=" + params.query + (refresh ? "&re=true" : "")
    );
    if (e) {
        return [e, true, []];
    } else {
        return [e, res.lastPage === params.lastPage, res.items];
    }
}
