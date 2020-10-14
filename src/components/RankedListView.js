import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";

import { SortOptions } from "../misc/Utils";
import "../App.css";
import { getComments } from "../api/CommentRepo";
import { Dialog, useTheme } from "@material-ui/core";
import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { CommentCard } from "./CommentCard";
import { UserContext } from "../Contexts";
import { BackButton } from "./BackButton";

// id: string
// open: bool
// onClose: callback
export const RankedListView = (props) => {
    const mainUser = useContext(UserContext);
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    return (
        <Dialog
            onClose={props.onClose}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            fullWidth={true}
            maxWidth={"sm"}
        >
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
                    <BackButton onClick={props.onClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                        "RANKED LIST"
                    </h1>
                </div>
                <div
                    class="col"
                    style={{
                        alignItems: "center",
                        overscrollBehaviorY: "scroll",
                        maxWidth: "100%",
                        marginBottom: "6px",
                    }}
                >
                    RANKED LIST ITEMS HERE
                </div>
            </div>
        </Dialog>
    );
};

let page = 1;

// mainUser: object
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
};
