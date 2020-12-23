import * as api from "./RankApi";
import { saveToken } from "../misc/PrefStore";

export const tokenValid = async (token) => await api.post("/validate_token", token);

export async function loginUser(userName, password) {
    const [e, res] = await api.post("/login", "", { username: userName, password: password });
    if (e) {
        return [e, res];
    } else {
        saveToken(res["jwtToken"]);
        return [e, res];
    }
}

export async function signupUser(userName, password, bio) {
    const [e, res] = await api.post("/signup", "", { username: userName, password: password, bio: bio });
    if (e) {
        return [e, res];
    } else {
        saveToken(res["jwtToken"]);
        return [e, res];
    }
}
