import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import ReactLoading from "react-loading";
import RefreshIcon from "@material-ui/icons/Refresh";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { getRankedListPreview } from "../api/RankedListPreviewRepo";
import { RankedListCard } from "./RankedListCard";
import { appThemeConstants } from "../misc/AppTheme";
import { SortMenu } from "./SearchUsers";
import "./Mason.css";
import { closeErrorSB, ErrorSnack } from "./ErrorSnack";
import { getSort, saveSort } from "../misc/PrefStore";

let page = 0;

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
};

// sort: int
// userId: string
// token: string
// query: string
// refresh: bool
// emptyMessage: string
// listType: string
// textTheme: object
// onUpdate: callback
export const GenericList = (props) => {
    const [rankedLists, setRankedLists] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const breakPoints = { default: 3 };
    const isSmall = useMediaQuery("(max-width:700px)");
    const isLarge = useMediaQuery("(min-width:1100px)");

    if (isSmall) {
        breakPoints.default = 1;
    } else if (isLarge) {
        breakPoints.default = 3;
    } else {
        breakPoints.default = 2;
    }

    const onPaginate = () => {
        (async () => {
            page += 1;

            const [e, lastPage, res] = await getRankedListPreview(
                getParams(page, props.sort, props.userId, props.token, props.query, props.refresh, props.listType)
            );
            setHitMax(lastPage);
            setApiError(e);
            if (!e) {
                setRankedLists([...rankedLists, ...res]);
            }
        })();
    };

    const getListPreviews = async (refresh) => {
        setLoading(true);
        page = 0;
        setRankedLists([]);
        const [e, lastPage, res] = await getRankedListPreview(
            getParams(page, props.sort, props.userId, props.token, props.query, refresh, props.listType)
        );
        setHitMax(lastPage);
        setApiError(e);
        if (!e) {
            setRankedLists([...res]);
        }
        setLoading(false);
    };

    useEffect(() => {
        getListPreviews(false);
    }, [props.query, props.sort, props.listType]);
    
    useEffect(() => {
        getListPreviews(true);
    }, [props.refresh]);

    if (loading) {
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }

    return rankedLists.length ? (
        <div>
            <InfiniteScroll
                dataLength={rankedLists.length}
                next={onPaginate}
                hasMore={!hitMax}
                loader={<ReactLoading type="cylon" color={appThemeConstants.hanPurple} />}
            >
                <Masonry
                    breakpointCols={
                        rankedLists.length <= 2 && !isSmall ? { ...breakPoints, default: rankedLists.length } : breakPoints
                    }
                    className="gen-list-grid"
                    columnClassName="gen-list-col"
                >
                    {rankedLists.map((rList) => (
                        <RankedListCard onUpdate={props.onUpdate} rankedList={rList} key={"r_" + rList.dateCreated} />
                    ))}
                </Masonry>
            </InfiniteScroll>
            <ErrorSnack
                message="Error Loading Lists"
                open={apiError}
                handleClose={(event, reason) => closeErrorSB(event, reason, setApiError)}
            />
        </div>
    ) : (
        <h2 style={props.textTheme}>{props.emptyMessage}</h2>
    );
};

// title: string
// listType: string
// userId: string
// token: string
// query: string
// emptyMessage: string
// listType: string
// textTheme: object
// noSort: bool
export const SortedListContainer = (props) => {
    const [sort, setSort] = useState(getSort());
    const [refresh, setRefresh] = useState(false);
    const onSort = (sortOption) => {
        saveSort(sortOption)
        setSort(sortOption)
    };
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
                {props.noSort ? <i style={{ display: "none" }} /> : <SortMenu onSort={onSort} />}
            </div>
            <GenericList
                query={props.query}
                textTheme={props.textTheme}
                refresh={refresh}
                onUpdate={() => setRefresh(!refresh)}
                sort={sort}
                userId={props.userId}
                token={props.token}
                emptyMessage={props.emptyMessage}
                listType={props.listType}
            />
        </div>
    );
};

function getParams(page = 1, sort = 0, userId = "", token = "", query = "", refresh = false, listType) {
    return {
        page: page,
        sort: sort,
        userId: userId,
        token: token,
        query: query,
        refresh: refresh,
        endpointBase: listType,
    };
}
