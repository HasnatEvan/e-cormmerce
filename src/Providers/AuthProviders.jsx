// src/Contexts/AuthProviders.jsx
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { app } from "../Firebase/firebase.config";

// Create Context
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================
     AUTH FUNCTIONS
  ===================== */

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Update Firebase profile (ONLY supported fields)
  const updateUserProfile = (name, photoURL = null) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };

  /* =====================
     AUTH STATE OBSERVER
  ===================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        // ✅ Get JWT token
        try {
          await axios.post(
            "http://localhost:5000/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (error) {
          console.error("JWT error:", error.message);
        }
      } else {
        // ✅ Remove JWT cookie
        try {
          await axios.get("http://localhost:5000/logout", {
            withCredentials: true,
          });
        } catch (error) {
          console.error("Logout error:", error.message);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* =====================
     CONTEXT VALUE
  ===================== */
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
