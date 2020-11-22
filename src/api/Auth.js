import * as api from "./RankApi";
import { saveToken } from "../misc/PrefStore";

export const tokenValid = async (token) => await api.post("/validate_token", token);

export async function loginUser(userName, password) {
    var [e, res] = await api.post("/login", "", { user_name: userName, password: password });
    if (e) {
        return [e, res];
    } else {
        saveToken(res["jwt_token"]);
        return [e, res];
    }
}

export async function signupUser(userName, password, bio) {
    var [e, res] = await api.post("/signup", "", { user_name: userName, password: password, bio: bio });
    if (e) {
        return [e, res];
    } else {
        saveToken(res["jwt_token"]);
        return [e, res];
    }
}
