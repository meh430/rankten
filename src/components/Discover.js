import React from "react";
import { useTheme } from "@material-ui/core";

import { RankedListPreviewTypes } from "../api/RankedListPreviewRepo";
import { SortedListContainer } from "./GenericList";
import { getTextTheme } from "../misc/AppTheme";
import "../App.css";

export const Discover = () => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    return (
        <div className="col" style={{alignItems: "center"}}>
            <SortedListContainer
                title="Discover Lists"
                listType={RankedListPreviewTypes.discoverLists}
                emptyMessage="No one's made any lists :("
                textTheme={textTheme}
            />
        </div>
    );
};
