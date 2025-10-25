import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext({
  user: null,
  loading: true,
  googleSignIn: () => {},
  userSignIn: () => {},
  logout: () => {},
  userSignUp: () => {},
});
const auth = getAuth(app);
console.log("Auth initialized:", auth);
const UserContext = ({ children }) => {
  const [user, setUser] = useState();
  console.log(user);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //GoogleSignIn
  const googleSignIn = () => {
    setLoading(true);
    return signInWithRedirect(auth, googleProvider);
  };
  //User SignIn
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //User SignUp
  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //OnAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //User Log Out
  const logout = () => {
    return signOut(auth);
  };
  const authInfo = {
    googleSignIn,
    userSignIn,
    logout,
    userSignUp,
    loading,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
