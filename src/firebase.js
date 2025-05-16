import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1ug2AdH4W5DdTCFH3tr8S2OtkrqIXF2I",
  authDomain: "mylaundry-application.firebaseapp.com",
  projectId: "mylaundry-application",
  storageBucket: "mylaundry-application.appspot.com",
  messagingSenderId: "643475603319",
  appId: "1:643475603319:web:092e3a1cec852069316b72"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };





