// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCzKVJ4fEaIav4sCLFJhiz_jTndPksJpiA",
  authDomain: "awesome-kanban-board.firebaseapp.com",
  projectId: "awesome-kanban-board",
  storageBucket: "awesome-kanban-board.firebasestorage.app",
  messagingSenderId: "538738827291",
  appId: "1:538738827291:web:214f02bf2e66474e5e58be",
  measurementId: "G-XEV1XGEBL4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app);