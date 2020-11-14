import * as api from "./RankApi";
import { saveToken } from "../misc/PrefStore";

export const tokenValid = async(token) => await api.post("/validate_token", token);

export async function loginUser(userName, password) {
    var [hasError, response] = await api.post("/login", "", { user_name: userName, password: password });
    if (hasError) {
        return [hasError, response];
    } else {
        saveToken(response["jwt_token"]);
        return [hasError, response];
    }
}

export async function signupUser(userName, password, bio) {
    var [hasError, response] = await api.post("/signup", "", { user_name: userName, password: password, bio: bio });
    if (hasError) {
        return [hasError, response];
    } else {
        saveToken(response["jwt_token"]);
        return [hasError, response];
    }
}
