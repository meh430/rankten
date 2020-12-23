import React, { useEffect, useReducer, useState } from "react";
import ReactLoading from "react-loading";
import EditIcon from "@material-ui/icons/Edit";
import { Dialog, useTheme } from "@material-ui/core";

import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { BackButton } from "./BackButton";
import { ListReducerTypes, rankedListReducer } from "../reducers/RankedListReducer";
import { getRankedList } from "../api/RankedListRepo";
import { RankItemCard } from "./RankItemCard";
import { CardHeader, CardLikeBar } from "./RankedListCard";

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
                    {props.mainUser.user.username === props.name ? (
                        <EditIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={props.onEdit} />
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
                        name={listNull ? "Loading..." : rankedList.username}
                        userId={listNull ? 1 : rankedList.userId}
                        profPic={props.profPic}
                        timeStamp={listNull ? 0 : rankedList.dateCreated}
                        isDark={currentTheme.palette.type === "dark"}
                        full={true}
                    />
                    {listNull ? (
                        <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                    ) : (
                        rankedList.rankItems.map((rItem) => (
                            <RankItemCard
                                key={rItem.ranking}
                                rankItem={rItem}
                                textTheme={textTheme}
                                cardTheme={cardTheme}
                                isMain={false}
                            />
                        ))
                    )}
                    {listNull ? (
                        <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                    ) : (
                        <div style={{ width: "100%" }}>
                            <CardLikeBar
                                numComments={rankedList.numComments}
                                numLikes={rankedList.numLikes}
                                textTheme={textTheme}
                                id={rankedList.listId}
                                isLiked={props.mainUser.user.likedLists.includes(rankedList.listId)}
                                mainUser={props.mainUser}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Dialog>
    );
};
