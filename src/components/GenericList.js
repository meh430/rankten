import React, { useEffect, useState } from 'react';

//sort: int
//name: string
//token: string
//query: string
//emptyMessage: string
//listType: string
export const GenericList = props => {
    const [rankedLists, setRankedLists] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("rendered")
    }, []);
}

function getParams(page = 1, sort = 0, name = "", token = "", query = "", refresh=false, listType) {
    return {
        page: page,
        sort: sort,
        name: name,
        token: token,
        query: query,
        endpointBase: listType
    };
}