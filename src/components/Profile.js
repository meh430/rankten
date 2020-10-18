import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";

import { UserInfo } from "./UserInfo";
import { getUser } from "../api/UserRepo";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { RankedListPreviewTypes } from "../api/RankedListPreviewRepo";
import { UserContext } from "../Contexts";
import { SortedListContainer } from "./GenericList";
import "../App.css";
import { NewListButton } from "./NewListButton";

//isMain: bool
//userName: string
export const Profile = (props) => {
    const [otherUser, setOtherUser] = useState(null);
    const [errorState, setErrorState] = useState(false);
    const [displayLiked, setDisplayLiked] = useState(false);
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
                <NewListButton/>

                <UserInfo
                    isMain={true}
                    onListClick={() => setDisplayLiked(false)}
                    onLikeClick={() => setDisplayLiked(true)}
                />

                <SortedListContainer
                    textTheme={textTheme}
                    title={(displayLiked ? "Liked" : "Your") + " Lists"}
                    listType={displayLiked ? RankedListPreviewTypes.likedLists : RankedListPreviewTypes.userListsP}
                    token={userToken}
                    emptyMessage={"You haven't + " + (displayLiked ? "liked" : "created") + " any lists"}
                />
            </div>
        );
    } else {
        if (errorState) {
            return <h2 style={getTextTheme(currentTheme)}>Error</h2>;
        } else if (otherUser) {
            return (
                <div className="col" style={{ alignItems: "center" }}>
                    <UserInfo isMain={false} user={otherUser} />
                    <SortedListContainer
                        name={otherUser["user_name"]}
                        textTheme={textTheme}
                        title={`${otherUser["user_name"]}'s Lists`}
                        listType={RankedListPreviewTypes.userLists}
                        emptyMessage={`${otherUser["user_name"]} hasn't made any lists`}
                    />
                </div>
            );
        } else {
            return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
        }
    }
};

//textTheme: object
//isMain: bool
//token: string
//name: string
/*const UserRankedLists = (props) => {
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [refresh, setRefresh] = useState(false);
    const onSort = (sortOption) => setSort(sortOption);
    return (
        <div className="col">
            <div className="row" style={{ alignItems: "center", justifyContent: "space-around" }}>
                <div className="row" style={{ alignItems: "center" }}>
                    <h2 style={props.textTheme}>{props.isMain ? "Your Lists" : `${props.name}'s Lists`}</h2>
                    <RefreshIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => setRefresh(!refresh)}
                    />
                </div>
                <SortMenu onSort={onSort} />
            </div>
            <GenericList
                refresh={refresh}
                sort={sort}
                name={props.name}
                token={props.token}
                emptyMessage={props.isMain ? "You haven't made any lists" : `${props.name} hasn't made any lists`}
                listType={props.isMain ? RankedListPreviewTypes.userListsP : RankedListPreviewTypes.userLists}
            />
        </div>
    );
};*/
