import React, { useEffect, useReducer, useState } from "react";
import { Dialog, TextField, useTheme } from "@material-ui/core";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import ReactLoading from "react-loading";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/Delete";

import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { ListReducerTypes, rankedListReducer } from "../reducers/RankedListReducer";
import { getRankedList } from "../api/RankedListRepo";
import { BackButton } from "./BackButton";
import { RankItemCard } from "./RankItemCard";
import "../App.css";

let listTitle = "";

// open: bool
// isNew: bool
// listId: string
// mainUser: object
// onClose: callback
export const RankedListEdit = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);
    const [rankedList, rankedListDispatch] = useReducer(rankedListReducer, null);
    const [loading, setLoading] = useState(false);
    const [editTitle, setEditTitle] = useState(false);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        rankedListDispatch({
            type: ListReducerTypes.reOrderList,
            payload: { startIndex: result.source.index, endIndex: result.destination.index },
        });
    };

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
                    payload: { isNew: props.isNew, rankedList: res },
                });
            }
            setLoading(false);
        })();
    }, [props.listId, props.open, props.isNew]);

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
                        paddingTop: "10px",
                        paddingBottom: "10px",
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
                        {listNull ? (
                            <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                                Loading...
                            </h1>
                        ) : editTitle ? (
                            <TextField
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        rankedListDispatch({
                                            type: ListReducerTypes.updateTitle,
                                            payload: { title: listTitle },
                                        });
                                        setEditTitle(false);
                                        event.preventDefault();
                                    }
                                }}
                                onChange={(event) => (listTitle = event.target.value)}
                                id="standard-basic"
                                style={{
                                    marginLeft: "22px",
                                    fontSize: "22px",
                                }}
                                defaultValue={rankedList.title}
                            />
                        ) : (
                            <h1
                                onClick={() => setEditTitle(true)}
                                style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}
                            >
                                {rankedList.title}
                            </h1>
                        )}
                    </div>
                    <div className="row" style={{ alignItems: "center", justifyContent: "end" }}>
                        {!listNull && rankedList.private ? (
                            <VisibilityOffIcon
                                onClick={() =>
                                    rankedListDispatch({
                                        type: ListReducerTypes.updatePrivate,
                                        payload: { private: false },
                                    })
                                }
                                style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                        ) : (
                            <VisibilityIcon
                                onClick={() =>
                                    rankedListDispatch({
                                        type: ListReducerTypes.updatePrivate,
                                        payload: { private: true },
                                    })
                                }
                                style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                        )}

                        <DeleteIcon style={{ cursor: "pointer", marginRight: "10px" }} />
                    </div>
                </div>
                <div
                    className="col"
                    style={{
                        alignItems: "center",
                        overscrollBehaviorY: "scroll",
                        maxWidth: "100%",
                    }}
                >
                    {listNull ? (
                        <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                    ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="list">
                                {(provided) => {
                                    return (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {rankedList["rank_list"].map((rItem, index) => (
                                                <Draggable
                                                    key={rItem["_id"]["$oid"]}
                                                    draggableId={rItem["_id"]["$oid"]}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <RankItemCard
                                                            rankItem={rItem}
                                                            textTheme={textTheme}
                                                            cardTheme={cardTheme}
                                                            innerRef={provided.innerRef}
                                                            provided={provided}
                                                        />
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </DragDropContext>
                    )}
                </div>
            </div>
        </Dialog>
    );
};
/*
rankedList["rank_list"].map((rItem) => (
                            <RankItemCard
                                key={rItem.rank}
                                rankItem={rItem}
                                textTheme={textTheme}
                                cardTheme={cardTheme}
                            />
                        ))
                        {listNull ? (
                            <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                                Loading...
                            </h1>
                        ) :
                            {editTitle ?
                                        (<TextField
                                id="standard-basic"
                                style={{
                                    marginLeft: "22px",
                                    fontSize: "22px"
                                }}
                                defaultValue={rankedList.title}
                            />) : (<h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                                rankedList.title
                            </h1>)}}
        
*/
