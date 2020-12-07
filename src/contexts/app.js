import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext({});

function AppProvider({ children }){
    const [message, setMessageProvider] = useState('');

    function setMessage(_message){
        setMessageProvider(_message);
        setTimeout(() => {
            setMessageProvider('');
        }, 4000);
    }

    return(
        <AppContext.Provider value={{ 
            setMessage,
            message
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;