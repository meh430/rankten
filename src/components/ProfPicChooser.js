import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useTheme } from "@material-ui/core";

import { BackButton } from './BackButton';
import { UserContext } from "../Contexts";
import { getTextTheme } from "../misc/AppTheme";
import "../App.css";

export const ProfPicChooser = (props) => {
    const { user, userDispatch, userToken } = useContext(UserContext);
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header
                className="row"
                style={{
                    backgroundColor: currentTheme.palette.background.default,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BackButton color={currentTheme.palette.text.primary} onClick={props.onHide}/>
                <h4 style={textTheme}>Choose a Profile Pic</h4>
            </Modal.Header>
            <Modal.Body>
                <h3>Body</h3>
            </Modal.Body>
        </Modal>
    );
};
