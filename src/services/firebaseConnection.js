import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import json from '../secret/token.json';

let firebaseConfig = json;

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;