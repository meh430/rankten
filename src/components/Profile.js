import React from "react";

import { UserInfo } from "./UserInfo";
import "../App.css";
export const Profile = (props) => {
    return (
        <div className="col" style={{ alignItems: "center" }}>
            <UserInfo isMain={true} />
        </div>
    );
};
