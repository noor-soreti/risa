import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { storeData, getItemFor } from "@/helperFunction/asyncStorageHelper";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [ user, setUser ] = useState<any>(null);
  const [ warn, setWarn ] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await getItemFor("user");
        if (storedUser) {
          console.log(`storedUser: ${storedUser}`);
          setUser(JSON.parse(storedUser));
        }
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser: any) => {
          console.log(`authenticatedUser: ${JSON.stringify(authenticatedUser)}`);
          if (authenticatedUser) {
            setUser(JSON.stringify(authenticatedUser));
            storeData("user", JSON.stringify(authenticatedUser));
          } else {
            setUser(null);
            storeData("user", '');
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(`login user: SUCCESS`);
    } catch (e) {
      console.log(`login user ERROR`);
      setWarn(e)
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        id: userCredential.user.uid
    })
      console.log(`register user: SUCCESS`);
    } catch (e) {
      console.log(`register user: ERROR`);
      setWarn(e.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      setWarn(e)
    }
  };

  const value = useMemo(() => ({ user, setUser, login, logout, register, warn }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
