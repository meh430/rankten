import { Menu, MenuItem, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import SortIcon from "@material-ui/icons/Sort";

import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { UserPreviewCard } from "./UserPreviewCard";
import { ActionButton } from "./ActionButton";
import { SortOptions } from "../misc/Utils";
import { searchUsers } from "../api/UserPreviewRepo";

import "../App.css";

//query: string
export const SearchUsers = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(SortOptions.likesDesc);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);
    const [anchor, setAnchor] = useState(null);

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

    const handleClose = (sortOption) => {
        (async () => {
            setPage(1);
            setLoading(true);
            const [e, lastPage, res] = await searchUsers({ page: 1, sort: sortOption, query: props.query });
            setHitMax(lastPage);
            if (!e) {
                setUserList([...res]);
            }
            setLoading(false);
            setSort(sortOption);
            setAnchor(null);
        })();
    };

    return (
        <div className="col" style={{ alignItems: "center", width: "100%" }}>
            <div
                className="row"
                style={{ alignItems: "center", justifyContent: "start", width: "800px", maxWidth: "100%" }}
            >
                <h2 style={textTheme}>Searching for users "{props.query}"</h2>
                <SortIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={(event) => setAnchor(event.currentTarget)}
                />
                <Menu id="simple-menu" anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={handleClose}>
                    <MenuItem onClick={() => handleClose(SortOptions.likesDesc)}>Likes</MenuItem>
                    <MenuItem onClick={() => handleClose(SortOptions.dateAsc)}>Oldest to Newest</MenuItem>
                    <MenuItem onClick={() => handleClose(SortOptions.dateDesc)}>Newest to Oldest</MenuItem>
                </Menu>
            </div>
            <div className="row" style={{ justifyContent: "center", flexWrap: "wrap", width: "80%" }}>
                {userList.length ? (
                    userList.map((user) => (
                        <UserPreviewCard
                            key={`user_${user["user_name"]}`}
                            userName={user["user_name"]}
                            profPic={user["prof_pic"]}
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
                    onClick={async () => {
                        setLoading(true);
                        const [e, lastPage, res] = await searchUsers({
                            page: page + 1,
                            sort: sort,
                            query: props.query,
                        });
                        setHitMax(lastPage);
                        if (!e) {
                            setUserList([...userList, ...res]);
                        }
                        setLoading(false);
                        setPage(page + 1);
                    }}
                />
            )}
        </div>
    );
};
