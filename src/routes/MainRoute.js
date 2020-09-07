import React, {useContext} from "react";
import { UserContext } from "../Contexts";
export const MainRoute = () => {
    const { user } = useContext(UserContext);
    return <h1>{JSON.stringify(user)}</h1>;
};
