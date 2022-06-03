import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAPekyjlMiczHRHPCsQvE2UNvuGpu8zSBQ",
    authDomain: "trabajointegrador-70170.firebaseapp.com",
    projectId: "trabajointegrador-70170",
    storageBucket: "trabajointegrador-70170.appspot.com",
    messagingSenderId: "347599778166",
    appId: "1:347599778166:web:632be1b541201863770a57"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

