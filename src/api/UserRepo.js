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
            return [e, followRes.unfollow];
        } else {
            return [e, followRes.follow];
        }
    }
}

export async function likeList(listId, token) {
    const [e, res] = await api.post("/like/" + listId, token);
    if (e) {
        return [e, res];
    } else {
        if (res.message.includes("unliked")) {
            return [e, likeRes.unliked];
        } else {
            return [e, likeRes.liked];
        }
    }
}
