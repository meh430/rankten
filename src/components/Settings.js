import React, { useContext, useState } from "react";
import { Dialog, useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";

import "../App.css";
import { BackButton } from "./BackButton";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { PasswordField, passwordPattern } from "./Login";
import { ActionButton } from "./ActionButton";
import { changePassword, deleteUser } from "../api/UserRepo";
import { UserContext } from "../Contexts";
import { loginUser } from "../api/Auth";
import { useHistory } from "react-router-dom";
import { clearStorage } from "../misc/PrefStore";
import { closeErrorSB, ErrorSnack } from "./ErrorSnack";
import { ProfilePicChooser } from "./ProfPicChooser";

//<ReactLoading type="bars" color={appThemeConstants.hanPurple} />

export const Settings = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const mainUser = useContext(UserContext);
    const history = useHistory();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldError, setOldError] = useState(false);
    const [newError, setNewError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [savedPassword, setSavedPassword] = useState(false);
    const [profPickerOpen, setProfPickerOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const resetPwdErrors = () => {
        setOldError(false);
        setNewError(false);
    }

    const validatePassword = async () => {
        console.log("enter");
        const [e, res] = await loginUser(mainUser.user.username, oldPassword);
        if (e) {
            setOldError(true);
            return false;
        }

        mainUser.setUserToken(res.jwtToken);
        if (!newPassword.match(passwordPattern)) {
            setNewError(true);
            return false;
        }

        resetPwdErrors();

        return true;
    };

    const trySaving = async () => {
        setApiError(false);
        setSavedPassword(false);
        resetPwdErrors();
        setLoading(true);
        if (await validatePassword()) {
            const [e, res] = await changePassword(newPassword, mainUser.userToken);
            if (e) {
                setApiError(e);
                setErrorMessage("Error saving password");
            } else {
                setOldPassword("");
                setNewPassword("");
                setSavedPassword(true);
            }
        }
        setLoading(false);
    };

    return (
        <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
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
                        width: "fit-content",
                        maxWidth: "100%",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        backgroundColor: currentTheme.palette.background.default,
                    }}
                >
                    <BackButton onClick={props.onClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                        Settings
                    </h1>
                </div>
                <ActionButton label="Change Profile Picture" width="320px" onClick={() => setProfPickerOpen(true)} />
                <ProfilePicChooser open={profPickerOpen} handleClose={() => setProfPickerOpen(false)} />
                <h3 style={{ ...textTheme, alignSelf: "start", margin: "0px", marginLeft: "18px" }}>Change Password</h3>
                <PasswordField
                    label="Old Password"
                    errorMessage="Incorrect password"
                    error={oldError}
                    onEnter={trySaving}
                    onChange={(event) => setOldPassword(event.target.value)}
                />
                <PasswordField
                    label="New Password"
                    error={newError}
                    onEnter={trySaving}
                    onChange={(event) => setNewPassword(event.target.value)}
                />

                {loading ? (
                    <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                ) : (
                    <div className="col" style={{ width: "100%", alignItems: "center" }}>
                        <ActionButton label="Save Password" onClick={trySaving} />
                        <ActionButton
                            label="Delete User"
                            color="red"
                            onClick={async () => {
                                setLoading(true);
                                setApiError(false);
                                const [e, res] = await deleteUser(mainUser.userToken);
                                if (e) {
                                    setApiError(e);
                                    setErrorMessage("Error deleting account");
                                    setLoading(false);
                                    return;
                                }

                                history.push("/auth");
                                clearStorage();
                                setLoading(false);
                            }}
                        />
                    </div>
                )}

                <ErrorSnack
                    open={apiError}
                    handleClose={(event, reason) => closeErrorSB(event, reason, setApiError)}
                    message={errorMessage}
                />

                <ErrorSnack
                    open={savedPassword}
                    severity="success"
                    handleClose={(event, reason) => closeErrorSB(event, reason, setSavedPassword)}
                    message="Saved Password!"
                />
            </div>
        </Dialog>
    );
};
