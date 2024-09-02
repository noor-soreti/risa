import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { storeData, getItemFor } from "@/helperFunction/asyncStorageHelper";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [ user, setUser ] = useState<any>(null);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser:any) => { 
      if (authenticatedUser) {
        console.log('authenticatedUser: exists');
        const uid = authenticatedUser.uid
        setUser(uid)
        storeData("user", uid)
      } else {
        console.log('authenticatedUser: null');
        setUser(null)
        storeData("user", '') 
      }

    }) 
    return () => unsubscribe()


    // const checkUser = async () => {
    //   try {
    //     const storedUser = await getItemFor("user");
    //     if (storedUser) {
    //       console.log('checkUser(): user stored ');
    //       const uid = JSON.parse(storedUser).uid
    //       setUser(uid);
    //     } 

    //     const unsubscribe = onAuthStateChanged(auth, (authenticatedUser: any) => {
    //       if (authenticatedUser) {
    //         console.log(`authenticatedUser: exists`);
    //         const uid = JSON.parse(authenticatedUser).uid
    //         setUser(uid);
    //         storeData("user", uid);
    //       } else {
    //       console.log(`authenticatedUser: null`);
    //         setUser(null);
    //         storeData("user", '');
    //       }
    //     });
    //     return () => unsubscribe();
    //   } catch (error) {
    //     console.error("Error checking user:", error);
    //   }
    // };
    // checkUser();
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
