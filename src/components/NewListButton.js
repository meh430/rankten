import React, { useContext } from 'react';
import { Button, withStyles } from "@material-ui/core";
import ReactLoading from "react-loading";
import AddIcon from '@material-ui/icons/Add';

import { resetUserContext, UserContext } from "../Contexts";
import { appThemeConstants } from '../misc/AppTheme';

const ListButton = withStyles((theme) => ({
    root: {
      padding: "8px",
    color: theme.palette.getContrastText(appThemeConstants.paraPink),
    backgroundColor: appThemeConstants.paraPink,
    '&:hover': {
      backgroundColor: appThemeConstants.paraPink,
    },
  },
}))(Button);

export const NewListButton = props => {
    const mainUser = useContext(UserContext);

    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }

    return (
        <div>
            <ListButton variant="contained" color="primary">
                <div className="row" style={{alignItems: "center", justifyContent: "space-evenly", width: "100px"}}>
                    <AddIcon />
                    <h4 style={{ fontFamily: appThemeConstants.fontFamily, margin: "0px"}}>New List</h4>
                </div>
            </ListButton>
        </div>
    )
}