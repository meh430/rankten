import React, { useContext, useState } from "react";
import { Button, withStyles } from "@material-ui/core";
import ReactLoading from "react-loading";
import AddIcon from "@material-ui/icons/Add";

import { resetUserContext, UserContext } from "../Contexts";
import { appThemeConstants } from "../misc/AppTheme";
import { RankedListEdit } from "./RankedListEdit";
import { createRankedList } from "../api/RankedListRepo";

const ListButton = withStyles((theme) => ({
    root: {
        padding: "8px",
        color: theme.palette.getContrastText(appThemeConstants.paraPink),
        backgroundColor: appThemeConstants.paraPink,
        "&:hover": {
            backgroundColor: appThemeConstants.paraPink,
        },
    },
}))(Button);

export const NewListButton = () => {
    const mainUser = useContext(UserContext);
    const [createNew, setCreateNew] = useState(false);

    const closeEdit = () => setCreateNew(false);

    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }

    return (
        <div>
            <ListButton variant="contained" color="primary" onClick={() => setCreateNew(true)}>
                <div className="row" style={{ alignItems: "center", justifyContent: "space-evenly", width: "100px" }}>
                    <AddIcon />
                    <h4 style={{ fontFamily: appThemeConstants.fontFamily, margin: "0px" }}>New List</h4>
                </div>
            </ListButton>

            <RankedListEdit
                open={createNew}
                isNew={true}
                mainUser={mainUser}
                onClose={closeEdit}
                onDelete={closeEdit}
                onSave={(rankedList) => {
                    if (rankedList && rankedList["rank_list"].length >= 1) {
                        (async () => {
                            await createRankedList(rankedList, mainUser.userToken);
                        })();
                    }
                }}
            />
        </div>
    );
};

// open: bool
// isNew: bool
// listId: string
// mainUser: object
// onClose: callback
// onSave: callback
