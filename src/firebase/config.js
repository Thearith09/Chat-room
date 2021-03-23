import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfQPFZ2N5nyMWhq8a2LorZRjWclfWzV6E",
  authDomain: "vue-firebase-sites-e7ad6.firebaseapp.com",
  projectId: "vue-firebase-sites-e7ad6",
  storageBucket: "vue-firebase-sites-e7ad6.appspot.com",
  messagingSenderId: "711542868237",
  appId: "1:711542868237:web:c1717cf393e6fb72bb4844",
};

firebase.initializeApp(firebaseConfig);


const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebase, projectAuth, projectFirestore, timestamp };
