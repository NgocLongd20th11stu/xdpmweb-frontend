import { useContext } from "react"

import { Navigate } from "react-router-dom";
import { UserAuthContext } from "./UserAuth";


export const UserRequireAuth = ({children}) => {
    const {user} = useContext(UserAuthContext);

    if(!user) {
        return <Navigate to={`/account/login`} />
    }

    return children;
}