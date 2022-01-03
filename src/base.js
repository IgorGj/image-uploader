import firebase from "firebase";
import "firebase/storage";

const app = firebase.initializeApp({
  projectId: "frb-cars",
  appId: "1:406719159180:web:724160b6df9d8c18a5d4a9",
  databaseURL: "https://frb-cars-default-rtdb.firebaseio.com",
  storageBucket: "frb-cars.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyBIwYmhpzmgfnbCQI40xMOPXjZZM9SLoxo",
  authDomain: "frb-cars.firebaseapp.com",
  messagingSenderId: "406719159180",
});

const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();
let storageRef = firebase.storage().ref();
let refUrl = firebase
  .storage()
  .refFromURL(
    `https://firebasestorage.googleapis.com/v0/b/frb-cars.appspot.com/o/Screenshot%20(67).png?alt=media&token=ce1415aa-8ecd-483e-9ba4-5a2d8c37e07f`
  );
export { app, db, auth, storage, storageRef, refUrl };
