import React, { useEffect, useState } from "react";
import { Dialog, useTheme } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import RefreshIcon from "@material-ui/icons/Refresh";

import { SortOptions } from "../misc/Utils";
import { BackButton } from "./BackButton";
import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { SortMenu } from "./SearchUsers";
import { getComments, getUserComments } from "../api/CommentRepo";
import { CommentCard } from "./CommentCard";
import "../App.css";

let page = 1;

// open: bool
// handleClose: callback
// mainUser: object
// listId: props
// userComments: bool
export const CommentsDialog = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);

    const [userComments, setUserComments] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        (async () => {
            if (!props.open) {
                return;
            }

            page = 1;
            setUserComments([]);
            const [e, lastPage, res] = props.userComments
                ? await getUserComments(page, sort, props.mainUser.userToken, refresh)
                : await getComments(props.listId, page, sort, refresh);
            setHitMax(lastPage);
            if (!e) {
                setUserComments([...res]);
            }
        })();
    }, [props.open, sort, refresh]);

    const onPaginate = () => {
        (async () => {
            page += 1;

            const [e, lastPage, res] = props.userComments
                ? await getUserComments(page, sort, props.mainUser.userToken, refresh)
                : await getComments(props.listId, page, sort, refresh);
            setHitMax(lastPage);
            if (!e) {
                setUserComments([...userComments, ...res]);
            }
        })();
    };

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div
                className="col"
                style={{
                    backgroundColor: currentTheme.palette.background.default,
                    alignItems: "center",
                    overscrollBehaviorY: "none",
                }}
            >
                <div
                    className="row"
                    style={{
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        alignSelf: "start",
                        maxWidth: "100%",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        backgroundColor: currentTheme.palette.background.default,
                    }}
                >
                    <div className="row" style={{ alignItems: "center" }}>
                        <BackButton onClick={props.handleClose} />
                        <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                            {props.userComments ? "Your Comments" : "Comments"}
                        </h1>
                    </div>
                    <div className="row" style={{ alignItems: "center", marginRight: "6px" }}>
                        <RefreshIcon style={{ cursor: "pointer" }} onClick={() => setRefresh(!refresh)} />
                        <SortMenu onSort={(sortOption) => setSort(sortOption)} />
                    </div>
                </div>
                {userComments.length ? (
                    <InfiniteScroll
                        dataLength={userComments.length}
                        next={onPaginate}
                        hasMore={!hitMax}
                        loader={<ReactLoading type="cylon" color={appThemeConstants.hanPurple} />}
                    >
                        <div className="col" style={{ alignItems: "center" }}>
                            {userComments.map((uComment) => (
                                <CommentCard
                                    comment={uComment}
                                    mainUser={props.mainUser}
                                    cardTheme={cardTheme}
                                    textTheme={textTheme}
                                    isDark={currentTheme.palette.type === "dark"}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <h2 style={props.textTheme}>You haven't commented on anything</h2>
                )}
            </div>
        </Dialog>
    );
};
