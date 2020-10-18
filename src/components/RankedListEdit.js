import React, { useEffect, useReducer, useState } from "react";
import { Dialog, TextField, useTheme } from "@material-ui/core";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import ReactLoading from "react-loading";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { ListReducerTypes, rankedListReducer } from "../reducers/RankedListReducer";
import { getRankedList } from "../api/RankedListRepo";
import { BackButton } from "./BackButton";
import { RankItemCard } from "./RankItemCard";
import { RankItemEdit } from "./RankItemEdit";
import "../App.css";

let listTitle = "";

// open: bool
// isNew: bool
// listId: string
// mainUser: object
// onClose: callback
// onSave: callback
// onDelete: callback
export const RankedListEdit = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const cardTheme = getCardStyle(currentTheme);
    const [rankedList, rankedListDispatch] = useReducer(rankedListReducer, null);
    const [loading, setLoading] = useState(false);
    const [editTitle, setEditTitle] = useState(false);

    const [editItem, setEditItem] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openNew, setOpenNew] = useState(false);

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

            if (props.isNew) {
                rankedListDispatch({
                    type: ListReducerTypes.getRankedList,
                    payload: { isNew: props.isNew },
                });
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
        <Dialog
            onClose={() => {
                props.onSave(rankedList);
                props.onClose();
            }}
            aria-labelledby="customized-dialog-title"
            open={props.open}
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
                        <BackButton
                            onClick={() => {
                                props.onSave(rankedList);
                                props.onClose();
                            }}
                        />
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

                        <DeleteIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={props.onDelete}/>
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
                    ) : rankedList["rank_list"].length ? (
                        <DragDropContext onDragEnd={onDragEnd} style={{ width: "100%" }}>
                            <Droppable droppableId="list" style={{ width: "100%" }}>
                                {(provided) => {
                                    return (
                                        <div
                                            style={{ width: "100%" }}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {rankedList["rank_list"].map((rItem, index) => (
                                                <Draggable
                                                    style={{ width: "100%" }}
                                                    key={rItem["_id"]["$oid"]}
                                                    draggableId={rItem["_id"]["$oid"]}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <RankItemCard
                                                            isMain={true}
                                                            rankItem={rItem}
                                                            textTheme={textTheme}
                                                            cardTheme={cardTheme}
                                                            innerRef={provided.innerRef}
                                                            provided={provided}
                                                            onDelete={() => {
                                                                rankedListDispatch({
                                                                    type: ListReducerTypes.deleteItem,
                                                                    payload: { index: index },
                                                                });
                                                            }}
                                                            onEdit={() => {
                                                                setEditIndex(index);
                                                                setEditItem(rItem);
                                                                setOpenEdit(true);
                                                            }}
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
                    ) : (
                        <h2 style={textTheme}>No items yet</h2>
                    )}
                </div>
                {!listNull && rankedList["rank_list"].length < 10 ? (
                    <AddCircleIcon
                        style={{ marginBottom: "8px", fontSize: "40px", cursor: "pointer" }}
                        onClick={() => setOpenNew(true)}
                    />
                ) : (
                    <i style={{ display: "none" }} />
                )}

                {editItem && editIndex !== null ? (
                    <RankItemEdit
                        rankItem={editItem}
                        index={editIndex}
                        handleClose={() => {
                            setOpenEdit(false);
                            setEditIndex(null);
                            setEditItem(null);
                        }}
                        open={openEdit}
                        onSave={(index, name, description, picture) => {
                            rankedListDispatch({
                                type: ListReducerTypes.updateItem,
                                payload: { index: index, itemName: name, description: description, picture: picture },
                            });
                        }}
                    />
                ) : (
                    <i style={{ display: "none" }} />
                )}

                <RankItemEdit
                    isNew={true}
                    handleClose={() => {
                        setOpenNew(false);
                        setEditIndex(null);
                        setEditItem(null);
                    }}
                    open={openNew}
                    onSave={(index, name, description, picture) => {
                        rankedListDispatch({
                            type: ListReducerTypes.createItem,
                            payload: { itemName: name, description: description, picture: picture },
                        });
                    }}
                />
            </div>
        </Dialog>
    );
};