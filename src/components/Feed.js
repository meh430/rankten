import React, { useContext } from "react";
import { useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";

import { resetUserContext, UserContext } from "../Contexts";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { SortedListContainer } from "./GenericList";
import { RankedListPreviewTypes } from "../api/RankedListPreviewRepo";
import { NewListButton } from "./NewListButton";
import "../App.css";

export const Feed = () => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const mainUser = useContext(UserContext);
    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }
    const noFollowing = mainUser.user["num_following"] === 0;
    return (
        <div className="col" style={{ alignItems: "center" }}>
            <NewListButton/>
            {noFollowing ? (
                <h2 style={textTheme}>Follow people to see their lists here</h2>
            ) : (
                <SortedListContainer
                    noSort={true}
                    title="Feed"
                    token={mainUser.userToken}
                    listType={RankedListPreviewTypes.feedList}
                    emptyMessage="No lists posted in the last 24 hours"
                    textTheme={textTheme}
                />
            )}
        </div>
    );
};
