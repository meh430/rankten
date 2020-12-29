import * as api from "./RankApi";
import { getPagedResponse } from "./RankedListPreviewRepo";
import {getLikeResponse, likeRes} from "./UserRepo"

export async function likeComment(commentId, token) {
    const [e, res] = await api.post("/like_comment/" + commentId, token);
    return getLikeResponse(e, res);
}

export async function getUserComments(page, sort, token, refresh = false) {
    const [e, res] = await api.get(`/user_comments/${page}/${sort}${refresh ? "?re=True" : ""}`, token);
    return getPagedResponse(e, res, page);
}

export async function getComments(listId, page = 0, sort = 0, refresh = false) {
    const [e, res] = await api.get(`/comments/${listId}/${page}/${sort}${refresh ? "?re=True" : ""}`);
    return getPagedResponse(e, res, page);
}

export async function createComment(listId, comment, token, editing = false) {
    const endpoint = "/comment/" + listId;
    const body = { comment: comment };

    return editing ? await api.put(endpoint, token, body) : await api.post(endpoint, token, body);
}

export const deleteComment = async(commentId, token) => await api.del("/comment/" + commentId, token);

export const getCommentParent = async(commentId) => await api.get("/comment/" + commentId);