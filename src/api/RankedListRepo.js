import * as api from "./RankApi";

export async function getRankedList(listId) {
    return await api.get(`/rankedlist/${listId}`);
}

/* rankedList
    {
        "title": string,
        "rankItems": [
            {
                "itemName": string,
                "ranking": int,
                "description": optional string,
                "picture": optional string
            }
        ]
}
*/


export async function createRankedList(rankedList, token) {
    for (let i = 0; i < rankedList["rankItems"].length; i++) {
        delete rankedList["rankItems"][i]["new"];
        delete rankedList["rankItems"][i]["itemId"];
    }
    return await api.post("/rankedlist", token, rankedList);
}

export async function updateRankedList(rankedList, listId, token) {
    for (let i = 0; i < rankedList["rankItems"].length; i++) {
        if (rankedList["rankItems"][i].new) {
            delete rankedList["rankItems"][i]["new"];
            delete rankedList["rankItems"][i]["itemId"];
        } else {
            rankedList["rankItems"][i]["itemId"] = rankedList["rankItems"][i]["itemId"];
        }
    }
    
    return await api.put(`/rankedlist/${listId}`, token, {
        title: rankedList["title"],
        private: rankedList["private"],
        rankItems: rankedList["rankItems"],
    });
}

export async function deleteRankedList(listId, token) {
    return await api.del(`/rankedlist/${listId}`, token);
}