import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAeO8zTXaZ39fO-qNUiatUM-f5nZwlNxRY",
    authDomain: "prevoz2021-7f304.firebaseapp.com",
    databaseURL: "https://prevoz2021-7f304-default-rtdb.firebaseio.com",
    projectId: "prevoz2021-7f304",
    storageBucket: "prevoz2021-7f304.appspot.com",
    messagingSenderId: "87819076089",
    appId: "1:87819076089:web:5cfa757454fb30c1213d28"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;