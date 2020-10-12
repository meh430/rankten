import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import ReactLoading from "react-loading";
import RefreshIcon from "@material-ui/icons/Refresh";

import { getRankedListPreview } from "../api/RankedListPreviewRepo";
import { RankedListCard } from "./RankedListCard";
import { appThemeConstants } from "../misc/AppTheme";
import "./Mason.css";
import { SortOptions } from "../misc/Utils";
import { SortMenu } from "./SearchUsers";

let page = 1;

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
};

//sort: int
//name: string
//token: string
//query: string
//emptyMessage: string
//listType: string
//textTheme: object
export const GenericList = (props) => {
    const [rankedLists, setRankedLists] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPaginate = () => {
        (async () => {
            page += 1;

            const [e, lastPage, res] = await getRankedListPreview(
                getParams(page, props.sort, props.name, props.token, props.query, false, props.listType)
            );
            setHitMax(lastPage);
            if (!e) {
                setRankedLists([...rankedLists, ...res]);
            }
        })();
    };

    //TODO: PLS DO SOME BETTER ERROR HANDLING
    useEffect(() => {
        (async () => {
            page = 1;
            setRankedLists([]);
            setLoading(true);
            const [e, lastPage, res] = await getRankedListPreview(
                getParams(page, props.sort, props.name, props.token, props.query, props.refresh, props.listType)
            );
            setHitMax(lastPage);
            if (!e) {
                setRankedLists([...res]);
            }
            setLoading(false);
        })();
    }, [props.query, props.sort, props.refresh]);

    return rankedLists.length ? (
        <InfiniteScroll
            dataLength={rankedLists.length}
            next={onPaginate}
            hasMore={!hitMax}
            loader={<ReactLoading type="cylon" color={appThemeConstants.hanPurple} />}
        >
            <Masonry
                breakpointCols={
                    rankedLists.length <= 2
                        ? { ...breakpointColumnsObj, default: rankedLists.length }
                        : breakpointColumnsObj
                }
                className="gen-list-grid"
                columnClassName="gen-list-col"
            >
                {rankedLists.map((rList) => (
                    <RankedListCard rankedList={rList} key={"r_" + rList["date_created"]["$date"]} />
                ))}
            </Masonry>
        </InfiniteScroll>
    ) : (
        <h2 style={props.textTheme}>{props.emptyMessage}</h2>
    );
};

//title: string
//listType: string
//name: string
//token: string
//query: string
//emptyMessage: string
//listType: string
//textTheme: object
export const SortedListContainer = (props) => {
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [refresh, setRefresh] = useState(false);
    const onSort = (sortOption) => setSort(sortOption);
    return (
        <div className="col">
            <div className="row" style={{ alignItems: "center", justifyContent: "space-around" }}>
                <div className="row" style={{ alignItems: "center" }}>
                    <h2 style={props.textTheme}>{props.title}</h2>
                    <RefreshIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => setRefresh(!refresh)}
                    />
                </div>
                <SortMenu onSort={onSort} />
            </div>
            <GenericList
                textTheme={props.textTheme}
                refresh={refresh}
                sort={sort}
                name={props.name}
                token={props.token}
                emptyMessage={props.emptyMessage}
                listType={props.listType}
            />
        </div>
    );
};

function getParams(page = 1, sort = 0, name = "", token = "", query = "", refresh = false, listType) {
    return {
        page: page,
        sort: sort,
        name: name,
        token: token,
        query: query,
        refresh: refresh,
        endpointBase: listType,
    };
}
