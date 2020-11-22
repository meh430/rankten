import * as api from "./RankApi";

export const likeRes = { liked: "LIKED", unliked: "UNLIKED" };
export const followRes = { follow: "FOLLOW", unfollow: "UNFOLLOW" };

export const getUser = async (name) => await api.get("/users/" + name);

export const updateBio = async (bio, token) => await api.put("/users", token, { bio: bio });

export const updateProfilePic = async (profPic, token) => await api.put("/users", token, { prof_pic: profPic });

export async function followUser(name, token) {
    const [e, res] = await api.post("/follow/" + name, token);
    if (e) {
        return [e, res];
    } else {
        if (res.message.includes("unfollow")) {
            return [false, followRes.unfollow];
        } else {
            return [false, followRes.follow];
        }
    }
}

export async function likeList(listId, token) {
    const [hasError, response] = await api.post("/like/" + listId, token);
    if (hasError) {
        return [hasError, response];
    } else {
        if (response.message.includes("unliked")) {
            return [false, likeRes.unliked];
        } else {
            return [false, likeRes.liked];
        }
    }
}
