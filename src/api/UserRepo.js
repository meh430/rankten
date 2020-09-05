import * as api from './RankApi';

export async function getUser(name) {
    var [hasError, response] = await api.get('/users/' + name);
    return hasError ? undefined : response;
}

