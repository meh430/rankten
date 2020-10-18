import React from 'react';

import { Dialog, TextField, useTheme } from "@material-ui/core";
import { useState } from "react";
import { getTextTheme } from "../misc/AppTheme";
import { fieldTheme } from './Login';
import { ActionButton } from './ActionButton';

// open: bool
// rankItem: object
// handleClose: callback
// onSave: callback
// index: number
export const RankItemEdit = (props) => {


    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [pictureError, setPictureError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [picture, setPicture] = useState(props.rankItem.picture);
    const [name, setName] = useState(props.rankItem["item_name"]);
    const [desc, setDesc] = useState(props.rankItem.description);

    if (!props.open) {
        return <i style={{display: "none"}}/>
    }

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div className="col" style={{ alignItems: "center", backgroundColor: currentTheme.palette.background.default }}>
                <img
                    style={{ display: "none" }}
                    src={picture}
                    onError={() => setPictureError(true)}
                    onLoad={() => setPictureError(false)}
                />

                {pictureError ? (
                    <h1 style={textTheme}>No Image</h1>
                ) : (
                    <img
                        style={{ borderRadius: "4px", width: "375px", maxWidth: "98%", alignSelf: "center", margin: "8px" }}
                        src={picture}
                    />
                )}

                <TextField
                    defaultValue={picture}
                    style={fieldTheme}
                    id="pic-field"
                    label="Picture"
                    variant="outlined"
                    onChange={(event) => setPicture(event.target.value)}
                />

                <TextField
                    defaultValue={name}
                    error={nameError}
                    helperText={nameError ? "Name cannot be empty" : ""}
                    style={fieldTheme}
                    id="name-field"
                    label="Name"
                    variant="outlined"
                    onChange={(event) => setName(event.target.value)}
                />

                <TextField
                    defaultValue={desc}
                    style={fieldTheme}
                    id="desc-field"
                    label="Desc"
                    variant="outlined"
                    onChange={(event) => setDesc(event.target.value)}
                />

                <ActionButton
                    disabled={nameError}
                    width="225px"
                    onClick={async () => {
                        if (!name) {
                            setNameError(true);
                            setTimeout(() => setNameError(false), 3000)
                            return;
                        }

                        props.onSave(props.index, name, desc, picture);
                        props.handleClose();
                    }}
                    label="Save Item"
                />
            </div>
        </Dialog>
    );
};
