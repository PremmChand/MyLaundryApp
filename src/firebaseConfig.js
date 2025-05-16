import { firebase } from "@react-native-firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1ug2AdH4W5DdTCFH3tr8S2OtkrqIXF2I",
    authDomain: "mylaundry-application.firebaseapp.com",
    projectId: "mylaundry-application",
    storageBucket: "mylaundry-application.appspot.com",
    messagingSenderId: "643475603319",
    appId: "1:643475603319:web:092e3a1cec852069316b72"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized
}

export { firebase };