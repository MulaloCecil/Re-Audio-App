import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, browserLocalPersistence } from "firebase/auth"; // Note the changes here

const firebaseConfig = {
  apiKey: "AIzaSyBVGZipXyV_5Bs0DVrXOkoPrfxI2t28CrM",
  authDomain: "recording-app-51464.firebaseapp.com",
  projectId: "recording-app-51464",
  storageBucket: "recording-app-51464.appspot.com",
  messagingSenderId: "472216405276",
  appId: "1:472216405276:web:fd7920f4f67a2f6264a6d9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication instance

// Configure persistence
const persistenceSettings = {
  type: browserLocalPersistence, // Use browserLocalPersistence for React Native
};

export const db = getFirestore(app);
export const storage = getStorage(app);

