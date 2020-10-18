import React, { useEffect, useReducer, useState } from "react";
import ReactLoading from "react-loading";
import EditIcon from "@material-ui/icons/Edit";
import { Dialog, useTheme } from "@material-ui/core";

import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { BackButton } from "./BackButton";
import { ListReducerTypes, rankedListReducer } from "../reducers/RankedListReducer";
import { getRankedList } from "../api/RankedListRepo";
import { RankItemCard } from "./RankItemCard";
import { CardHeader } from "./RankedListCard";
import "../App.css";

// listId: string
// open: bool
// onClose: callback
// mainUser: object
// profPic: string
// name: string
// onEdit: callback
export const RankedListView = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);
    const [rankedList, rankedListDispatch] = useReducer(rankedListReducer, null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (!props.open) {
                return;
            }
            setLoading(true);

            const [e, res] = await getRankedList(props.listId);
            if (!e) {
                rankedListDispatch({
                    type: ListReducerTypes.getRankedList,
                    payload: { isNew: false, rankedList: res },
                });
            }
            setLoading(false);
        })();
    }, [props.listId, props.open]);

    const listNull = loading || !rankedList;

    return (
        <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div
                className="col"
                style={{
                    width: "100%",
                    backgroundColor: currentTheme.palette.background.default,
                    alignItems: "center",
                    overscrollBehaviorY: "none",
                }}
            >
                <div
                    className="row"
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "start",
                        width: "100%",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        backgroundColor: currentTheme.palette.background.default,
                    }}
                >
                    <div className="row" style={{ alignItems: "center", justifyContent: "start" }}>
                        <BackButton onClick={props.onClose} />
                        <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                            {listNull ? "Loading..." : rankedList.title}
                        </h1>
                    </div>
                    {props.mainUser.user["user_name"] === props.name ? (
                        <EditIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={props.onEdit}/>
                    ) : (
                        <i style={{ display: "none" }} />
                    )}
                </div>
                <div
                    className="col"
                    style={{
                        alignItems: "center",
                        overscrollBehaviorY: "scroll",
                        maxWidth: "100%",
                    }}
                >
                    <CardHeader
                        name={listNull ? "Loading..." : rankedList["user_name"]}
                        profPic={props.profPic}
                        timeStamp={listNull ? 0 : rankedList["date_created"]["$date"]}
                        isDark={currentTheme.palette.type === "dark"}
                        full={true}
                    />
                    {listNull ? (
                        <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                    ) : (
                        rankedList["rank_list"].map((rItem) => (
                            <RankItemCard
                                key={rItem.rank}
                                rankItem={rItem}
                                textTheme={textTheme}
                                cardTheme={cardTheme}
                                isMain={false}
                            />
                        ))
                    )}
                </div>
            </div>
        </Dialog>
    );
};
// name: string
// profPic: string
// timeStamp: number
// isDark: bool
//let page = 1;

/*// mainUser: object
// id: string
// open: bool
const ListComments = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [comments, setComments] = useState([]);
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [hitMax, setHitMax] = useState(false);

    const onPaginate = () => {
        (async () => {
            if (!props.open) {
                return;
            }
            page += 1;

            const [e, lastPage, res] = await getComments(props.id, page, sort, refresh);
            setHitMax(lastPage);
            if (!e) {
                setComments([...comments, ...res]);
            }
        })();
    };

    useEffect(() => {
        (async () => {
            if (!props.open) {
                return;
            }

            setLoading(true);
            page = 1;
            setComments([]);
            const [e, lastPage, res] = await getComments(props.id, page, sort, refresh);
            setHitMax(lastPage);
            if (!e) {
                setComments([...res]);
            }
            setLoading(false);
        })();
    }, [props.id, props.open, sort, refresh]);

    if (!comments.length) {
        return <h2 style={textTheme}>No comments</h2>;
    }

    if (loading) {
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }

    return (
        <div className="col" style={{ width: "412px" }}>
            <InfiniteScroll
                dataLength={comments.length}
                next={onPaginate}
                hasMore={!hitMax}
                loader={<ReactLoading type="cylon" color={appThemeConstants.hanPurple} />}
            >
                <div className="col">
                    {comments.map((comment) => (
                        <CommentCard
                            comment={comment}
                            mainUser={props.mainUser}
                            cardTheme={cardTheme}
                            textTheme={textTheme}
                            isDark={currentTheme.palette.type === "dark"}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};*/
