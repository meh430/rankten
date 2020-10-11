import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";
import RefreshIcon from '@material-ui/icons/Refresh';

import { UserInfo } from "./UserInfo";
import { getUser } from "../api/UserRepo";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { GenericList } from "./GenericList";
import { SortMenu } from "./SearchUsers"
import { RankedListPreviewTypes } from "../api/RankedListPreviewRepo";
import { SortOptions } from "../misc/Utils";
import "../App.css";

//textTheme: object
//isMain: bool
//token: string
//name: string
const UserRankedLists = (props) => {
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const onSort = sortOption => setSort(sortOption);
    return (
        <div className="col" style={{width: "100%"}}>
            <div className="row" style={{ alignItems: "center", justifyContent: "space-around" }}>
                <div className="row" style={{alignItems: "center"}}>
                    <h2 style={props.textTheme}>{props.isMain ? "Your Lists" : `${props.name}'s Lists`}</h2>
                    <RefreshIcon style={{marginLeft: "10px"}}/>
                </div>
                <SortMenu onSort={onSort}/>
            </div>
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
                <UserRankedLists textTheme={textTheme} isMain={true}/>
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
