import React, { useEffect, useState } from "react";
import { Menu, MenuItem, useTheme } from "@material-ui/core";
import ReactLoading from "react-loading";
import SortIcon from "@material-ui/icons/Sort";

import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { UserPreviewCard } from "./UserPreviewCard";
import { ActionButton } from "./ActionButton";
import { SortOptions } from "../misc/Utils";
import { searchUsers } from "../api/UserPreviewRepo";
import "../App.css";

//onSort: callback
//user: bool
export const SortMenu = (props) => {
    const [anchor, setAnchor] = useState(null);
    const onItemClick = (sort) => {
        props.onSort(sort);
        setAnchor(null);
    };
    return (
        <div>
            <SortIcon
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={(event) => setAnchor(event.currentTarget)}
            />
            <Menu id="simple-menu" anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => onItemClick(SortOptions.likesDesc)}>{ props.user ? "Points" : "Likes"}</MenuItem>
                <MenuItem onClick={() => onItemClick(SortOptions.dateAsc)}>Oldest to Newest</MenuItem>
                <MenuItem onClick={() => onItemClick(SortOptions.dateDesc)}>Newest to Oldest</MenuItem>
            </Menu>
        </div>
    );
};

let page = 0;
let sort = SortOptions.likesDesc;
//query: string
export const SearchUsers = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [userList, setUserList] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSort = (sortOption) => {
        (async () => {
            page = 0;
            setLoading(true);
            const [e, lastPage, res] = await searchUsers({ page: 0, sort: sortOption, query: props.query });
            setHitMax(lastPage);
            if (!e) {
                setUserList([...res]);
            }
            setLoading(false);
            sort = sortOption;
        })();
    };

    useEffect(() => {
        onSort(sort);
    }, [props.query]);

    return (
        <div className="col" style={{ alignItems: "center", width: "100%" }}>
            <div
                className="row"
                style={{ alignItems: "center", justifyContent: "start", width: "800px", maxWidth: "100%" }}
            >
                <h2 style={textTheme}>Searching for users "{props.query}"</h2>
                <SortMenu onSort={onSort} user={true} />
            </div>
            <div className="row" style={{ justifyContent: "center", flexWrap: "wrap", width: "80%" }}>
                {userList.length ? (
                    userList.map((user) => (
                        <UserPreviewCard
                            key={`user_${user.username}`}
                            userName={user.username}
                            userId={user.userId}
                            profPic={user.profilePic}
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
                        page += 1;
                    }}
                />
            )}
        </div>
    );
};
