import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { EmailAuthProvider } from 'firebase/auth'; 
import { getAuth } from 'firebase/auth'; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA7SlKVITQrTB8YAcYdOHqwuvsKUj1SXCE",
  authDomain: "invoice-app-b748c.firebaseapp.com",
  projectId: "invoice-app-b748c",
  storageBucket: "invoice-app-b748c.appspot.com",
  messagingSenderId: "977528048911",
  appId: "1:977528048911:web:80a7f5afbbc4885d06427a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new EmailAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { provider, auth, storage };
export default db;