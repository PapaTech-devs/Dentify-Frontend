import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { getUser } from "../utils/queryDatabase";

const FirebaseCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESUREMENTID,
};

// if a Firebase instance doesn't exist, create one
firebase.initializeApp(FirebaseCredentials);

const formatAuthUser = async (user) => {
  try {
    const currUser = await getUser(user.uid);
    console.log(currUser);
    return currUser;
  } catch (err) {
    console.error(err);
  }
};

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    console.log("Authstate", authState);
    setLoading(true);
    var formattedUser = await formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = async (email, password) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.uid;
  };

  const signMeOut = async () => {
    await signOut(auth);
  };

  // listen for app state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    authUser,
    loading,
    signIn,
    setAuthUser,
    createUser,
    signMeOut,
  };
}
