import * as api from "./RankApi";

export async function getRankedList(listId) {
    return await api.get(`/rankedlist/${listId}`);
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
    for (let i = 0; i < rankedList["rank_list"].length; i++) {
        delete rankedList["rank_list"][i]["new"];
        delete rankedList["rank_list"][i]["_id"];
    }
    return await api.post("/rankedlist", token, rankedList);
}

export async function updateRankedList(rankedList, listId, token) {
    for (let i = 0; i < rankedList["rank_list"].length; i++) {
        if (rankedList["rank_list"][i].new) {
            delete rankedList["rank_list"][i]["new"];
            delete rankedList["rank_list"][i]["_id"];
        } else {
            delete rankedList["rank_list"][i]["belongs_to"];
            delete rankedList["rank_list"][i]["created_by"];
            rankedList["rank_list"][i]["_id"] = rankedList["rank_list"][i]["_id"]["$oid"];
        }
    }
    
    return await api.put(`/rankedlist/${listId}`, token, {
        title: rankedList["title"],
        private: rankedList["private"],
        rank_list: rankedList["rank_list"],
    });
}

export async function deleteRankedList(listId, token) {
    return await api.del(`/rankedlist/${listId}`, token);
}