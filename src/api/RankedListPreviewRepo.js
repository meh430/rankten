import * as api from "./RankApi";

export const RankedListPreviewTypes = {
    discoverLists: "discover",
    likedLists: "likes",
    userLists: "rankedlists",
    userListsP: "rankedlistsp",
    feedLists: "feed",
    searchLists: "search_lists",
};

/* 
    params: {
        endpointBase: string,
        name: string,
        page: int,
        sort: int,
        token: string,
        query: string,
        refresh: bool
    } 
*/

export const getRankedListPreview = async (params) => {
    let { token, refresh } = params;
    if (!token) {
        token = "";
    }

    let endpoint = getEndpoint(params.endpointBase, params.page, params.sort, params.name, params.query, refresh);

    const [e, res] = await api.get(endpoint, token);
    if (e) {
        return res.includes("Page") ? [false, true, []] : [e, false, []];
    } else if (res.length === 10) {
        const [e1, res1] = await api.get(getEndpoint(params.endpointBase, params.page + 1, params.sort, params.name, params.query, refresh), token);
        return res1.includes("Page") ? [false, true, res] : [e1, false, res];
    }  else {
        return [e, res.length < 10, res];
    }
};

function getEndpoint(endpointBase, page, sort, name, query, refresh) {
    let endpoint = "/" + endpointBase;

    switch (endpointBase) {
        case RankedListPreviewTypes.discoverLists:
            endpoint += `/${page}/${sort}`;
            break;
        case RankedListPreviewTypes.likedLists:
            endpoint += `/${page}/${sort}`;
            break;
        case RankedListPreviewTypes.userLists:
            endpoint += `/${name}/${page}/${sort}`;
            break;
        case RankedListPreviewTypes.userListsP:
            endpoint += `/${page}/${sort}`;
            break;
        case RankedListPreviewTypes.feedLists:
            endpoint += `/${page}`;
            break;
        case RankedListPreviewTypes.searchLists:
            console.log(query);
            endpoint += `/${page}/${sort}?q=${query.replace(/ /g, "+")}`;
            break;
    }

    if (refresh) {
        if (endpointBase === RankedListPreviewTypes.searchLists) {
            endpoint += "&re=True";
        } else {
            endpoint += "?re=True";
        }
    }

    return endpoint
}
