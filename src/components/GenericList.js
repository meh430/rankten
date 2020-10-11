import React, { useEffect, useState } from "react";
import Masonry from 'react-masonry-css'

import { getRankedListPreview } from "../api/RankedListPreviewRepo";
import { RankedListCard } from "./RankedListCard";
import './Mason.css'

let page = 1;

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

//sort: int
//name: string
//token: string
//query: string
//emptyMessage: string
//listType: string
export const GenericList = (props) => {
    const [rankedLists, setRankedLists] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);

    //TODO: PLS DO SOME BETTER ERROR HANDLING
    useEffect(() => {
        (async () => {
            page = 1;
            setRankedLists([]);
            setLoading(true);
            const [e, lastPage, res] = await getRankedListPreview(
                getParams(page, props.sort, props.name, props.token, props.query, false, props.listType)
            );
            setHitMax(lastPage);
            if (!e) {
                setRankedLists([...res]);
            }
            setLoading(false);
        })();
    }, [props.query, props.sort]);

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="gen-list-grid"
            columnClassName="gen-list-col"
        >
            {rankedLists.map(rList => <RankedListCard rankedList={rList} key={'r_' + rList['date_created']['$date']}/>)}
        </Masonry>
    );
};

function getParams(page = 1, sort = 0, name = "", token = "", query = "", refresh = false, listType) {
    return {
        page: page,
        sort: sort,
        name: name,
        token: token,
        query: query,
        endpointBase: listType,
    };
}
