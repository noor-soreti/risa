import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { storeData, getItemFor } from "@/helperFunction/asyncStorageHelper";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [ user, setUser ] = useState<any>(null);  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser: any) => {
          if (authenticatedUser) {
            console.log(`authenticatedUser: exists`);
            setUser(authenticatedUser);
          } else {
            console.log(`authenticatedUser: null`);
            setUser(null);
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };
    checkUser();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);
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