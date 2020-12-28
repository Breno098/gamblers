import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import json from '../secret/token.json';

if(!firebase.apps.length){
    firebase.initializeApp(json);
}

export default firebase;