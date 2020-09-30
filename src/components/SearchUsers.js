import { useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { UserPreviewCard } from "./UserPreviewCard";
import { SortOptions } from "../misc/Utils";
import { searchUsers } from "../api/UserPreviewRepo";

import "../App.css";
import { ActionButton } from "./ActionButton";

//query: string
export const SearchUsers = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [e, lastPage, res] = await searchUsers({ page: page, sort: sort, query: props.query });
            setHitMax(lastPage);
            if (!e) {
                setUserList([...res]);
            }
            setLoading(false);
        })();
    }, [page, sort, props.query]);

    return (
        <div className="col" style={{ alignItems: "center", width: "100%" }}>
            <h2 style={textTheme}>Searching for users "{props.query}"</h2>
            <div className="row" style={{ justifyContent: "center", flexWrap: "wrap", width: "100%"}}>
                {userList.length ? (
                    userList.map((user) => (
                        <UserPreviewCard
                            key={`user_${user["user_name"]}`}
                            userName={user["user_name"]}
                            profPic={user["prof_pic"]}
                            bio={user["bio"]}
                        />
                    ))
                ) : (
                    <h3 style={textTheme}>No users found</h3>
                )}
            </div>
            {loading ? (
                <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
            ) : hitMax ? (
                <i style={{ display: "none" }} />
            ) : (
                <ActionButton label="Load more" width="120px" onClick={() => console.log("load more")} />
            )}
        </div>
    );
};