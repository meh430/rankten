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