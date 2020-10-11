import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";

import { UserInfo } from "./UserInfo";
import { getUser } from "../api/UserRepo";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { GenericList } from "./GenericList";
import "../App.css";
import { RankedListPreviewTypes } from "../api/RankedListPreviewRepo";

//isMain: bool
//token: string
//name: string
const UserRankedLists = props => {
    return (
        <div>
            
        </div>
    );
}

//isMain: bool
//userName: string
export const Profile = (props) => {
    const [otherUser, setOtherUser] = useState(null);
    const [errorState, setErrorState] = useState(false);
    const currentTheme = useTheme();
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
                <GenericList sort={0} name={"meh4life"} listType={RankedListPreviewTypes.userLists}/>
            </div>
        );
    } else {
        if (errorState) {
            return <h2 style={getTextTheme(currentTheme)}>Error</h2>
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
