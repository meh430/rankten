import React, { useEffect, useState } from "react";
import { Dialog, InputAdornment, TextField, useTheme } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ReactLoading from "react-loading";

import { SortOptions } from "../misc/Utils";
import { BackButton } from "./BackButton";
import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { SortMenu } from "./SearchUsers";
import { createComment, getComments, getUserComments } from "../api/CommentRepo";
import { CommentCard } from "./CommentCard";
import { ActionButton } from "./ActionButton";
import { RankedListView } from "./RankedListView";
import { RankedListEdit } from "./RankedListEdit";
import { deleteRankedList, updateRankedList } from "../api/RankedListRepo";
import { fieldTheme } from "./Login";
import SendIcon from "@material-ui/icons/Send";
import "../App.css";
import { LoadingDialog } from "./LoadingDialog";

let page = 1;

let commentContent = "";

// open: bool
// handleClose: callback
// mainUser: object
// listId: props
// userComments: bool
export const CommentsDialog = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);

    const [commentsList, setCommentsList] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [refresh, setRefresh] = useState(false);
    const [id, setId] = useState(null);
    const [profPic, setProfPic] = useState(null);
    const [name, setName] = useState(null);
    const [listOpen, setListOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [sendCommentLoading, setSendCommentLoading] = useState(false);

    const [commented, setCommented] = useState(false);

    /*const sendComment = () => {
        (async () => {
            
            setSendCommentLoading(true);
            const [e, res] = await createComment(props.listId, commentContent, props.mainUser.userToken, false);
            if (!e) {
                setRefresh(true);
            }

            setSendCommentLoading(false);
            return [e, res];
        })();
    }*/

    const sendComment = async () => {
        return await createComment(props.listId, commentContent, props.mainUser.userToken, false);
    };

    const onListNav = (toId, pic, name) => {
        setId(toId);
        setProfPic(pic);
        setName(name);
        setListOpen(true);
    };

    useEffect(() => {
        (async () => {
            if (!props.open) {
                return;
            }

            page = 1;
            setCommentsList([]);
            const [e, lastPage, res] = props.userComments
                ? await getUserComments(page, sort, props.mainUser.userToken, refresh)
                : await getComments(props.listId, page, sort, refresh);
            setHitMax(lastPage);
            if (!e) {
                setCommentsList([...res]);
            }
        })();
    }, [props.open, sort, refresh]);

    const onPaginate = async () => {
        page += 1;

        const [e, lastPage, res] = props.userComments
            ? await getUserComments(page, sort, props.mainUser.userToken, refresh)
            : await getComments(props.listId, page, sort, refresh);
        setHitMax(lastPage);
        if (!e) {
            setCommentsList([...commentsList, ...res]);
        }
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

                {commentsList.length >= 1 ? (
                    <div className="col" style={{ alignItems: "center", width: "100%" }}>
                        {commentsList.map((uComment) => (
                            <CommentCard
                                onUpdate={() => setRefresh(!refresh)}
                                onListNav={onListNav}
                                toList={props.userComments}
                                key={uComment["_id"]["$oid"]}
                                comment={uComment}
                                mainUser={props.mainUser}
                                cardTheme={cardTheme}
                                textTheme={textTheme}
                                isDark={currentTheme.palette.type === "dark"}
                            />
                        ))}
                        {hitMax ? (
                            <i style={{ display: "none" }} />
                        ) : (
                            <ActionButton label="Load More" width="145px" onClick={onPaginate} />
                        )}
                    </div>
                ) : (
                    <h2 style={props.textTheme}>No comments found</h2>
                )}
                {props.userComments && id ? (
                    <RankedListView
                        listId={id}
                        open={listOpen}
                        onClose={() => setListOpen(false)}
                        mainUser={props.mainUser}
                        profPic={profPic}
                        name={name}
                        onEdit={() => {
                            setListOpen(false);
                            setEditOpen(true);
                        }}
                    />
                ) : (
                    <i style={{ display: "none" }} />
                )}

                <RankedListEdit
                    open={editOpen}
                    isNew={false}
                    listId={id}
                    mainUser={props.mainUser}
                    onClose={() => setEditOpen(false)}
                    onSave={(rankedList) => {
                        (async () => {
                            await updateRankedList(rankedList, id, props.mainUser.userToken);
                        })();
                    }}
                    onDelete={() => async () => await deleteRankedList(id, props.mainUser.userToken)}
                />

                {props.userComments ? (
                    <i style={{ display: "none" }} />
                ) : (
                    <div
                        className="row"
                        style={{
                            justifyContent: "space-evenly",
                            width: "100%",
                            alignItems: "center",
                            alignSelf: "center",
                            maxWidth: "100%",
                            position: "sticky",
                            bottom: "0",
                            zIndex: "1",
                            backgroundColor: currentTheme.palette.background.default,
                        }}
                    >
                        {sendCommentLoading ? (
                            <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                        ) : (
                            <TextField
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        setCommented(true);
                                        event.preventDefault();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <SendIcon
                                                onClick={() => setCommented(true)}
                                                style={{
                                                    cursor: "pointer",
                                                    color:
                                                        currentTheme.palette.type === "dark"
                                                            ? appThemeConstants.lavender
                                                            : appThemeConstants.hanPurple,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                style={fieldTheme}
                                label="Comment"
                                multiline
                                id="comment-field"
                                variant="outlined"
                                error={props.error}
                                helperText={props.error ? "Bio cannot be empty" : ""}
                                onChange={(event) => (commentContent = event.target.value)}
                            />
                        )}
                    </div>
                )}
                <LoadingDialog
                    open={commented}
                    asyncTask={sendComment}
                    onClose={() => {
                        setCommented(false);
                        setRefresh(true);
                    }}
                    errorMessage="Failed to send comment"
                    successMessage="Successfully commented"
                />
            </div>
        </Dialog>
    );
};

