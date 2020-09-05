import * as api from './RankApi';
import { saveCred } from '../misc/PrefStore';

async function tokenValid(token) {
    var [hasError, response] = await api.post('/validate_token', {}, token);
    return hasError ? undefined : response;
}

async function loginUser(userName, password) {
    var [hasError, response] = await api.post('/login', { 'user_name': userName, 'password': password });
    if (hasError) {
        return undefined
    } else {
        saveCred(response.jwtToken, userName, password);
        return response;
    }
}

async function signupUser(userName, password, bio) {
    var [hasError, response] = await api.post('/signup', { 'user_name': userName, 'password': password, 'bio': bio });
    if (hasError) {
        return undefined;
    } else {
        saveCred(response.jwtToken, userName, password);
        return response;
    }
}