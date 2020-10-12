import React, { useEffect, useState } from "react";
import { Dialog, useTheme } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import RefreshIcon from "@material-ui/icons/Refresh";

import { SortOptions } from "../misc/Utils";
import { BackButton } from "./BackButton";
import { getCardStyle, getTextTheme } from "../misc/AppTheme";
import { SortMenu } from "./SearchUsers";
import { getUserComments } from "../api/CommentRepo";
import "../App.css";
import { CommentCard } from "./CommentCard";

let page = 1;

// open: bool
// handleClose: callback
// mainUser: object
export const UserComments = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);

    const [userComments, setUserComments] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [sort, setSort] = useState(SortOptions.likesDesc);

    useEffect(() => {
        (async () => {
            if (!props.open) {
                return;
            }

            page = 1;
            setUserComments([]);
            const [e, lastPage, res] = await getUserComments(page, sort, props.mainUser.userToken, false);
            setHitMax(lastPage);
            if (!e) {
                setUserComments([...res]);
            }
        })();
    }, [props.open, sort]);

    const onPaginate = () => {
        (async () => {
            page += 1;

            const [e, lastPage, res] = await getUserComments(page, sort, props.mainUser.userToken, false);
            setHitMax(lastPage);
            if (!e) {
                setUserComments([...rankedLists, ...res]);
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
                        alignItems: "center",
                        alignSelf: "start",
                        width: "fit-conent",
                        maxWidth: "100%",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        backgroundColor: currentTheme.palette.background.default,
                    }}
                >
                    <BackButton onClick={props.handleClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                        Your Comments
                    </h1>
                    <SortMenu onSort={(sortOption) => setSort(sortOption)} />
                </div>
                <InfiniteScroll
                    dataLength={rankedLists.length}
                    next={onPaginate}
                    hasMore={!hitMax}
                    loader={<ReactLoading type="cylon" color={appThemeConstants.hanPurple} />}
                >
                    <div className="col" style={{ alignItems: "center" }}>
                        {userComments.map((uComment) => (
                            <CommentCard
                                comment={uComment}
                                mainUser={mainUser}
                                cardTheme={cardTheme}
                                textTheme={textTheme}
                                isDark={currentTheme.palette.type === "dark"}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </Dialog>
    );
};
