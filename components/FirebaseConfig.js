import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyATdzuJn7eGyuS0fXRW3zLVv-4PVPX0XbU",
  authDomain: "finalyearproject-a4622.firebaseapp.com",
  databaseURL: "https://finalyearproject-a4622-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finalyearproject-a4622",
  storageBucket: "finalyearproject-a4622.appspot.com",
  messagingSenderId: "74911452623",
  appId: "1:74911452623:web:8c25c7bf017d3f18f0d6ba",
  measurementId: "G-VTJ5P26FHD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export { firebase }
