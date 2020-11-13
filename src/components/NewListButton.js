import React, { useContext, useState } from "react";
import { Button, withStyles } from "@material-ui/core";
import ReactLoading from "react-loading";
import AddIcon from "@material-ui/icons/Add";

import { resetUserContext, UserContext } from "../Contexts";
import { appThemeConstants } from "../misc/AppTheme";
import { RankedListEdit } from "./RankedListEdit";
import { createRankedList } from "../api/RankedListRepo";
import { LoadingDialog } from "./LoadingDialog";
import "../App.css";

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
    const [saving, setSaving] = useState(false);
    const [savedList, setSavedList] = useState(null);

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
                    setSavedList(rankedList);
                    setSaving(true);
                }}
            />

            <LoadingDialog
                open={saving}
                asyncTask={() => {
                    if (savedList && savedList["rank_list"].length >= 1) {
                        return createRankedList(savedList, mainUser.userToken);
                    }

                    return [true, null];
                }}
                onClose={() => setSaving(false)}
                errorMessage="Failed Creating List"
                successMessage="Created List!"
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
