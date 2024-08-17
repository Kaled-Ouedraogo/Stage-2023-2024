// context/EmailContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const EmailProvider = ({ children }) => {
    const [mail, setMail] = useState(null);

    return (
        <UserContext.Provider value={{ mail, setMail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useEmail = () => useContext(UserContext);
