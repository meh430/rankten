import React, { useEffect, useReducer, useState } from "react";
import { Dialog, useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { ListReducerTypes, rankedListReducer } from "../reducers/RankedListReducer";
import { getRankedList } from "../api/RankedListRepo";
import { BackButton } from "./BackButton";
import { RankItemCard } from "./RankItemCard";
import "../App.css";

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
                    <div className="row" style={{ alignItems: "center", justifyContent: "end" }}>
                        <VisibilityIcon style={{ cursor: "pointer", marginRight: "10px" }} />
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
                        rankedList["rank_list"].map((rItem) => (
                            <RankItemCard
                                key={rItem.rank}
                                rankItem={rItem}
                                textTheme={textTheme}
                                cardTheme={cardTheme}
                            />
                        ))
                    )}
                </div>
            </div>
        </Dialog>
    );
};
