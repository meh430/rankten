import * as api from "./RankApi";
import { saveToken } from "../misc/PrefStore";

export const tokenValid = async (token) => await api.post("/validate_token", token);

export async function loginUser(username, password) {
    const [e, res] = await api.post("/login", "", { username: username, password: password });
    return sendUserInfo(e, res);
}

export async function signupUser(username, password, bio) {
    const [e, res] = await api.post("/signup", "", { username: username, password: password, bio: bio });
    return sendUserInfo(e, res);
}

function sendUserInfo(error, response) {
    if (error) {
        return [error, response];
    } else {
        saveToken(response.jwtToken);
        return [error, response];
    }
}
