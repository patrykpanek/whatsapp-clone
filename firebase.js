import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA5GLFgSBhcpcdayYTo9MrYenGabU-TfRM',
  authDomain: 'whatsapp-ff9b5.firebaseapp.com',
  projectId: 'whatsapp-ff9b5',
  storageBucket: 'whatsapp-ff9b5.appspot.com',
  messagingSenderId: '305877960925',
  appId: '1:305877960925:web:977dcae8cf653afb443334',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
