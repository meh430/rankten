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
    } else if (res.length === 10) {
        const [e1, res1] = await api.get(`/user_comments/${page + 1}/${sort}${refresh ? "?re=True" : ""}`, token);
        return isLastPage(res1) ? [false, true, res] : [e1, false, res];
    } else {
        return [e, res.length < 10, "Trying to access a page that does not exist" === res[0] ? [] : res];
    }
}

export async function getComments(listId, page = 1, sort = 0, refresh = false) {
    const [e, res] = await api.get(`/comments/${listId}/${page}/${sort}${refresh ? "?re=True" : ""}`);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []];
    } else if (res.length === 10) {
        const [e1, res1] = await api.get(`/comments/${listId}/${page + 1}/${sort}${refresh ? "?re=True" : ""}`);
        return isLastPage(res1) ? [false, true, res] : [e1, false, res];
    } else {
        return [e, res.length < 10, "Trying to access a page that does not exist" === res[0] ? [] : res];
    }
}

export async function createComment(listId, comment, token, editing = false) {
    const endpoint = "/comment/" + listId;
    const body = { comment: comment };

    return editing ? await api.put(endpoint, token, body) : await api.post(endpoint, token, body);
}

export async function deleteComment(commentId, token) {
    return await api.del("/comment/" + commentId, token);
}

export async function getCommentParent(commentId) {
    return await api.get("/comment/" + commentId);
}

function isLastPage(response) {
    return (Array.isArray(response) && (typeof response[0] === 'string' || response[0] instanceof String) && response[0].includes("page"))
}