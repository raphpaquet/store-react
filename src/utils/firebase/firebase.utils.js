import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBl05XUsbnTCcMJQOrhylHaF0AVkzsgpMA",
  authDomain: "crwn-db-62f89.firebaseapp.com",
  projectId: "crwn-db-62f89",
  storageBucket: "crwn-db-62f89.appspot.com",
  messagingSenderId: "1025621986385",
  appId: "1:1025621986385:web:8a351f8f46880f614dfc70",
  measurementId: "G-W5XTHPVLH6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
};
