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
            setUserList([]);
            setPage(1);
            setSort(SortOptions.likesDesc);
            setLoading(true);
            const [e, lastPage, res] = await searchUsers({ page: 1, sort: SortOptions.likesDesc, query: props.query });
            setHitMax(lastPage);
            if (!e) {
                setUserList([...res]);
            }
            setLoading(false);
        })();
    }, [props.query]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [e, lastPage, res] = await searchUsers({ page: page, sort: sort, query: props.query });
            setHitMax(lastPage);
            if (!e) {
                setUserList([...userList, ...res]);
            }
            setLoading(false);
        })();
    }, [page]);

    useEffect(() => {
        (async () => {
            setPage(1);
            setLoading(true);
            const [e, lastPage, res] = await searchUsers({ page: 1, sort: sort, query: props.query });
            setHitMax(lastPage);
            if (!e) {
                setUserList([...res]);
            }
            setLoading(false);
        })();
    }, [sort]);

    return (
        <div className="col" style={{ alignItems: "center", width: "100%" }}>
            <h2 style={textTheme}>Searching for users "{props.query}"</h2>
            <div className="row" style={{ justifyContent: "center", flexWrap: "wrap", width: "80%" }}>
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
                <ActionButton
                    label="Load more"
                    width="120px"
                    onClick={() => {
                        setPage(page + 1);
                    }}
                />
            )}
        </div>
    );
};
