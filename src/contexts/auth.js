import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
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

    function verifySignUp(email, name, password, confirmPassword = ''){
        if(email.length === 0){
            setMessageTime('Insira um email.');
            return false;
        }
        if(name.length === 0){
            setMessageTime('Insira um nome.');
            return false;
        }
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

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            await firebase.database().ref('users').child(uid).once('value')
            .then(snapshot => {
                let data = {
                    uid: uid,
                    name: snapshot.val().name,
                    email: value.user.email
                };
                
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            });

        })
        .catch(error => {
            setMessageTime(error.code);
            setLoadingAuth(false);
        })
       
    }

    async function signUp(email, name, password, confirmPassword){
        if(! verifySignUp(email, name, password, confirmPassword)){
            return;
        }

        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            await firebase.database().ref('users').child(uid).set({
                score: 0,
                name: name
            }).then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
            .catch((error) => {
                setMessageTime(error.code);
                setLoadingAuth(false);
            })
        })
        .catch((error) => {
            setMessageTime(error.code);
            setLoadingAuth(false);
        })
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