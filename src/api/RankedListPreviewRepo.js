import * as api from './RankApi';

export const RankedListPreviewTypes = {
    discoverLists: "discover",
    likedLists: "likes",
    userLists: "rankedlists",
    userListsP: "rankedlistp",
    feedLists: "feed",
    searchLists: "search_lists"
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
    const { token } = params;
    if (!token) {
        token = "";
    }

    let endpoint = "/" + params.endpointBase;
    switch (params.endpointBase) {
        case RankedListPreviewTypes.discoverLists:
            endpoint += `/${params.page}/${params.sort}`;
            break;
        case RankedListPreviewTypes.likedLists:
            endpoint += `/${params.page}/${params.sort}`;
            break;
        case RankedListPreviewTypes.userLists:
            endpoint += `/${params.name}/${params.page}/${params.sort}`;
            break;
        case RankedListPreviewTypes.userListsP:
            endpoint += `/${params.page}/${params.sort}`;
            break;
        case RankedListPreviewTypes.feedLists:
            endpoint += `/${params.page}`
            break;
        case RankedListPreviewTypes.searchLists:
            endpoint += `/${params.page}/${params.sort}?q=${params.query.replace(/ /g, "+")}`;
            break;
    }

    return null;
}