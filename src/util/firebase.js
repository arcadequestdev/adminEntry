import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBWaLyhLSpQDlcfCnIMKff-oVASLGsNZyo",
  authDomain: "arcadequest-dev.firebaseapp.com",
  databaseURL: "https://arcadequest-dev-default-rtdb.firebaseio.com",
  projectId: "arcadequest-dev",
  storageBucket: "arcadequest-dev.appspot.com",
  messagingSenderId: "549807820790",
  appId: "1:549807820790:web:dda38aa77b3356dda701d7",
  measurementId: "G-89XSZXHL5W"
};

const AQFirebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default AQFirebase;