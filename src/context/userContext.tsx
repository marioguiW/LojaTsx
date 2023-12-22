
import React, { useState, createContext, ReactNode } from "react"
import { ClienteType } from "types/cliente"

interface UserContextType {
    user: ClienteType | null;
    setUser: React.Dispatch<React.SetStateAction<ClienteType | null>>;
  }

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }>= ({children})=>{

    const [user, setUser] = useState<ClienteType | null>(null)

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
    