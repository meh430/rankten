import { useTheme } from '@material-ui/core';
import React from 'react'

import '../App.css'
import { getTextTheme } from '../misc/AppTheme';
//query: string
export const SearchUsers = props => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    return (
        <div className="col" style={{alignItems: "center"}}>
            <h2 style={textTheme}>Searching for users "{props.query}"</h2>
        </div>
    );
}