import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

export const  fbConfig = {
    apiKey: "AIzaSyB_TdvVbP5CrbVRMcq9W-VAQ9wBMZnNP_U",
    authDomain: "do-it-now-665f3.firebaseapp.com",
    databaseURL: "https://do-it-now-665f3.firebaseio.com",
    projectId: "do-it-now-665f3",
    storageBucket: "do-it-now-665f3.appspot.com",
    messagingSenderId: "199827851953",
    appId: "1:199827851953:web:71b7e5eac50b8295c2f090",
    measurementId: "G-4LZLJLNC2M"
  };
  // Initialize Firebase
  firebase.initializeApp(fbConfig);
  firebase.firestore();

  export default firebase