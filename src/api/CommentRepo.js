import * as api from "./RankApi";
import {likeRes} from "./UserRepo"

export async function likeComment(commentId, token) {
    const [e, res] = await api.post("/like_comment/" + commentId, token);
    if (e) {
        return [e, res];
    } else if (res.message.includes("unliked")) {
        return [e, likeRes.unliked];
    } else {
        return [e, likeRes.liked];
    }
}

export async function getUserComments(page, sort, token, refresh = false) {
    const [e, res] = await api.get(`/user_comments/${page}/${sort}${refresh ? "?re=True" : ""}`, token);
    if (e) {
        return [e, true, []];
    } else {
        return [e, res.lastPage === page, res.items];
    }
}

export async function getComments(listId, page = 0, sort = 0, refresh = false) {
    const [e, res] = await api.get(`/comments/${listId}/${page}/${sort}${refresh ? "?re=True" : ""}`);
    if (e) {
        return [e, true, []];
    } else {
        return [e, res.lastPage === page, res.items];
    }
}

export async function createComment(listId, comment, token, editing = false) {
    const endpoint = "/comment/" + listId;
    const body = { comment: comment };

    return editing ? await api.put(endpoint, token, body) : await api.post(endpoint, token, body);
}

export const deleteComment = async(commentId, token) => await api.del("/comment/" + commentId, token);

export const getCommentParent = async(commentId) => await api.get("/comment/" + commentId);