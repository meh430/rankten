import * as api from "./RankApi";

export async function likeComment(commentId, token) {
    const [hasError, response] = await api.post("/like_comment/" + commentId, token);
    if (hasError) {
        return [hasError, response];
    } else {
        if (response.message.includes("unliked")) {
            return [false, "UNLIKED"];
        } else {
            return [false, "LIKED"];
        }
    }
}

export async function getUserComments(page, sort, token, refresh = false) {
    const [e, res] = await api.get(`/user_comments/${page}/${sort}${refresh ? "?re=True" : ""}`, token);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []];
    } else {
        return [e, res.length < 10, res];
    }
}

export async function getComments(listId, page = 1, sort = 0, refresh = false) {
    const [e, res] = await api.get(`/comments/${listId}/${page}/${sort}${refresh ? "?re=True" : ""}`);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []];
    } else {
        return [e, res.length < 10, res];
    }
}

export async function createComment(listId, comment, token, editing = false) {
    const endpoint = "/comment/" + listId;
    const body = { comment: comment };

    return editing ? await api.put(endpoint, token, body) : await api.post(endpoint, token, body);
}
