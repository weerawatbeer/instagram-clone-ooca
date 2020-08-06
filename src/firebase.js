import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDIxnoNkFYuJ9iF5h9N703mpwqTneinnvM",
  authDomain: "instagram-clone-ooca.firebaseapp.com",
  databaseURL: "https://instagram-clone-ooca.firebaseio.com",
  projectId: "instagram-clone-ooca",
  storageBucket: "instagram-clone-ooca.appspot.com",
  messagingSenderId: "97763725049",
  appId: "1:97763725049:web:ecd3d2922184b22b895c28",
  measurementId: "G-2X86YH4PS5",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
