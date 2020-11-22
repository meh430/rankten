import * as api from "./RankApi";

export const likeRes = { liked: "LIKED", unliked: "UNLIKED" }
export const followRes = {follow: "FOLLOW", unfollow: "UNFOLLOW"}

export async function getUser(name) {
    return await api.get("/users/" + name);
}

export async function updateBio(bio, token) {
    return await api.put("/users", token, { bio: bio });
}

export async function updateProfilePic(profPic, token) {
    return await api.put("/users", token, { prof_pic: profPic });
}

export async function followUser(name, token) {
    const [hasError, response] = await api.post("/follow/" + name, token);
    if (hasError) {
        return [hasError, response];
    } else {
        if (response.message.includes("unfollow")) {
            return [false, "UNFOLLOW"];
        } else {
            return [false, "FOLLOW"];
        }
    }
}

export async function likeList(listId, token) {
    const [hasError, response] = await api.post("/like/" + listId, token);
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
