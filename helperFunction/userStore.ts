import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { create } from 'zustand'

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid: string) => {
        if (!uid) return set({ currentUser: null, isLoading: false })
        try {
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(`Document data: ${docSnap.data()}`);
                set({ currentUser: docSnap.data(), isLoading: false })
            } else {
                set({ currentUser: null, isLoading: false })
            }
        } catch (error) {
            console.log(`useUserStore error: ${error}`);
            return set({ currentUser: null, isLoading: false })            
        }
    }
}))
