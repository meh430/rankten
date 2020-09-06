import * as api from './RankApi';
import { saveCred } from '../misc/PrefStore';

export async function tokenValid(token) {
    var response = await api.post('/validate_token', token);
    return response;
}

export async function loginUser(userName, password) {
    var [hasError, response] = await api.post('/login', "", { 'user_name': userName, 'password': password });
    if (hasError) {
        return [hasError, response]
    } else {
        saveCred(response.jwtToken);
        return [hasError, response];
    }
}

export async function signupUser(userName, password, bio) {
    var [hasError, response] = await api.post('/signup', "", { 'user_name': userName, 'password': password, 'bio': bio });
    if (hasError) {
        return [hasError, response];
    } else {
        saveCred(response.jwtToken);
        return [hasError, response];
    }
}