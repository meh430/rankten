import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";
import RefreshIcon from "@material-ui/icons/Refresh";

import { UserInfo } from "./UserInfo";
import { getUser } from "../api/UserRepo";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { GenericList } from "./GenericList";
import { SortMenu } from "./SearchUsers";
import { RankedListPreviewTypes } from "../api/RankedListPreviewRepo";
import { SortOptions } from "../misc/Utils";
import "../App.css";
import { UserContext } from "../Contexts";

//textTheme: object
//isMain: bool
//token: string
//name: string
const UserRankedLists = (props) => {
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const onSort = (sortOption) => setSort(sortOption);
    return (
        <div className="col">
            <div className="row" style={{ alignItems: "center", justifyContent: "space-around" }}>
                <div className="row" style={{ alignItems: "center" }}>
                    <h2 style={props.textTheme}>{props.isMain ? "Your Lists" : `${props.name}'s Lists`}</h2>
                    <RefreshIcon style={{ marginLeft: "10px" }} />
                </div>
                <SortMenu onSort={onSort} />
            </div>
            <GenericList
                sort={sort}
                name={props.name}
                token={props.token}
                emptyMessage={props.isMain ? "You haven't made any lists" : `${props.name} hasn't made any lists`}
                listType={props.isMain ? RankedListPreviewTypes.userListsP : RankedListPreviewTypes.userLists}
            />
        </div>
    );
};

//isMain: bool
//userName: string
export const Profile = (props) => {
    const [otherUser, setOtherUser] = useState(null);
    const [errorState, setErrorState] = useState(false);
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const { userToken } = useContext(UserContext);
    useEffect(() => {
        (async () => {
            if (props.isMain) {
                return;
            }

            const [e, userInfo] = await getUser(props.userName);
            if (e) {
                setErrorState(e);
            } else {
                setOtherUser(userInfo);
            }
        })();
    }, [props.userName]);

    if (props.isMain) {
        return (
            <div className="col" style={{ alignItems: "center" }}>
                <UserInfo isMain={true} />
                <UserRankedLists textTheme={textTheme} isMain={true} token={userToken} />
            </div>
        );
    } else {
        if (errorState) {
            return <h2 style={getTextTheme(currentTheme)}>Error</h2>;
        } else if (otherUser) {
            return (
                <div className="col" style={{ alignItems: "center" }}>
                    <UserInfo isMain={false} user={otherUser} />
                </div>
            );
        } else {
            return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
        }
    }
};
