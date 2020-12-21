import React, { useState, createContext } from 'react';

export const AppContext = createContext({});

function AppProvider({ children }){
    const [message, setMessageProvider] = useState('');
    const [appRoute, setAppRoute] = useState('');

    function setMessage(_message){
        setMessageProvider(_message);
        setTimeout(() => {
            setMessageProvider('');
        }, 4000);
    }

    return(
        <AppContext.Provider value={{ 
            setMessage,
            message,
            setAppRoute,
            appRoute
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;