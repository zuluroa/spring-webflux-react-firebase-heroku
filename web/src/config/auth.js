import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyCQlW-x22eqNBBVAP897ACBqBDlSi70WFE",
    authDomain: "questions-b1bfb.firebaseapp.com",
    databaseURL: "https://questions-b1bfb-default-rtdb.firebaseio.com",
    projectId: "questions-b1bfb",
    storageBucket: "questions-b1bfb.appspot.com",
    messagingSenderId: "613482157611",
    appId: "1:613482157611:web:e4253de8d745e4f939fc6e",
    measurementId: "G-1XBXSQMQNF"
});

export const auth = firebase.auth();

export function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

export function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function logoutu() {
    return auth.signOut();
}

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};