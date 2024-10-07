import { db } from '@/firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { create } from 'zustand'

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid: string) => {
        if (!uid) return set({ currentUser: null, isLoading: false })
            console.log(`useUserStore - fetchUserInfo - uid: ${uid}`);        
        try {
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log(`useUserStore - Document data: ${docSnap.data()}`);
                set({ currentUser: docSnap.data(), isLoading: false })
            } else {
                set({ currentUser: null, isLoading: false })
                console.log(`useUserStore - Document data: null`);
            }
        } catch (error) {
            console.log(`useUserStore error: ${error}`);
            return set({ currentUser: null, isLoading: false })            
        }
    },
    getUserChats: async (currentUserId: any) => {
        try {
            const userRef = doc(db, 'userChats', currentUserId)
            return 'yes'
            // console.log(userRef);
            // const userSnap = await getDoc(userRef)  
            // return userSnap
        } catch (error) {
            console.log(`getUserChats: ${error}`);
            return null
        }
    },
    handleFindFriend: async (search: any) => {
        try {
            const userRef = collection(db, 'users')
            const q = query(userRef, where("displayName", '==', search))
            const querySnapshot = await getDocs(q)
            if (!querySnapshot.empty) {   
                return querySnapshot.docs[0].data()    
          }
          return null
        } catch (error) {
          console.log(`handleUserSearch: ${error}`);
        }
    },
}))