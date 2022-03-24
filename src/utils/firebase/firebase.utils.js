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

// Providers are like Facebook, github, google, ....
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  return userDocRef;
};
