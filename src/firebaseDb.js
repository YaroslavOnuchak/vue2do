import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXsumcup-fJWPdDOngpHkXnqHcCATS3YI",
    authDomain: "vue2to.firebaseapp.com",
    databaseURL: "https://vue2to.firebaseio.com",
    projectId: "vue2to",
    storageBucket: "vue2to.appspot.com",
    messagingSenderId: "52110265682",
    appId: "1:52110265682:web:2651b089f27f02d1abbe8b"
};
// Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();