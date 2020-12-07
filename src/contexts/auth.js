import React, { useState, createContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){
                setUser( JSON.parse(storageUser) );
                setLoading(false);
            }

            setLoading(false);
        }
        loadStorage();
    }, []);

    function passwordVerify(password, confirmPassword = ''){
        if(password.length < 8){
            setMessageTime('Digite uma senha com mais de 8 caracteres.');
            return false;
        }
        if(password !== confirmPassword){
            setMessageTime('Confirme corretamente a senha.');
            return false;
        }
        return true;
    }

    function setMessageTime(message){
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 4000);
    }

    async function signIn(email, password){
        if(email.length === 0){
            setMessageTime('Digite o email.');
            return false;
        }
        if(password.length === 0){
            setMessageTime('Digite a senha.');
            return false;
        }

        setLoadingAuth(true);

        setTimeout( () => {
            setUser({ name: email });
            storageUser({ name: email });
            setLoadingAuth(false);
        }, 3000);
       
    }

    async function signUp(email, name, password, confirmPassword){
        if(! passwordVerify(password, confirmPassword)){
            return;
        }

        setLoadingAuth(true);

        setTimeout( () => {
            setUser({ name: email });
            storageUser({ name: email });
            setLoadingAuth(false);
        }, 3000);
    }

    async function storageUser(data){
        AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(() => {
            setUser(null)
        });
    }

    return(
        <AuthContext.Provider value={{ 
            signed: !!user , 
            user, 
            signUp, 
            signIn, 
            loading, 
            signOut,
            loadingAuth,
            message
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;