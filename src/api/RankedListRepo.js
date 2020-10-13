import * as api from "./RankApi";

export async function getRankedList(listId) {
    return await api.get(`/rankedlist/${listId}`)
}

/* rankedList
    {
        "title": string,
        "rank_list": [
            {
                "item_name": string,
                "rank": int,
                "description": optional string,
                "picture": optional string
            }
        ]
}
*/
export async function createRankedList(rankedList, token) {
    return await api.post('/rankedlist', token, rankedList);
}

export async function updateRankedList(rankedList, listId, token) {
    return await api.put(`/rankedlist/${listId}`, token, { "title": rankedList["title"], "rank_list": rankedList["rank_list"]});
}