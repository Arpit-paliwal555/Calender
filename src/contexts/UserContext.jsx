import { createContext, useContext } from "react";
import { useState } from "react";

const userContext = createContext();

export const useUserContext = ()=>{return useContext(userContext);}

export const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');

    return (
        <userContext.Provider value={{user, setUser, userName, setUserName}}>
            {children}
        </userContext.Provider>
    )
}