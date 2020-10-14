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

// id: string
// open: bool
// onClose: callback
export const RankedListView = (props) => {
    const mainUser = useContext(UserContext);

    return (
        <Dialog
            onClose={props.onClose}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            fullWidth={true}
            maxWidth={"md"}
        >
            <div className="row">
                <div>Ranked List Display</div>
                <ListComments mainUser={mainUser} id={props.id} open={props.open} />
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
        <div className="col">
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
