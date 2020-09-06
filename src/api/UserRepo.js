import * as api from "./RankApi";

export async function getUser(name) {
    var response = await api.get("/users/" + name);
    return response;
}

export async function updateBio(bio, token) {
    var response = await api.put("/users", token, { bio: bio });
    return response;
}

export async function updateProfilePic(profPic, token) {
    var response = await api.put("/users", token, { prof_pic: profPic });
    return response;
}

export async function followUser(name, token) {
    var [hasError, response] = await api.post("/follow/" + name, token);
    if (hasError) {
        return [hasError, response];
    } else {
        if (response.message.includes("unfollow")) {
            return [true, "UNFOLLOW"];
        } else {
            return [true, "FOLLOW"];
        }
    }
}

export async function likeList(listId, token) {
    var [hasError, response] = await api.post("/like/" + listId, token);
    if (hasError) {
        return [hasError, response];
    } else {
        if (response.message.includes("unliked")) {
            return [true, "UNLIKED"];
        } else {
            return [true, "LIKED"];
        }
    }
}

export async function likeComment(commentId, token) {
    var [hasError, response] = await api.post("/like_comment/" + commentId, token);
    if (hasError) {
        return [hasError, response];
    } else {
        if (response.message.includes("unliked")) {
            return [true, "UNLIKED"];
        } else {
            return [true, "LIKED"];
        }
    }
}
