import React from 'react'
import { useTheme } from '@material-ui/core';

import { getTextTheme } from '../misc/AppTheme';
import { SortedListContainer } from './GenericList';
import { RankedListPreviewTypes } from '../api/RankedListPreviewRepo';
import "../App.css";

// query: string
export const SearchLists = props => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    return (
        <div className="col" style={{alignItems: "center"}}>
            <SortedListContainer
                title={`Searching for lists "${props.query}"`}
                listType={RankedListPreviewTypes.searchLists}
                query={props.query}
                emptyMessages="No lists found"
                textTheme={textTheme}
            />
        </div>
    );
};