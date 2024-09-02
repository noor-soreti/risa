import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { Pressable, SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { deleteDoc, doc } from "firebase/firestore";

export default function HomeSettings() {

    const { setUser } = useAuth()


    const signOut = async () => {
        try {
            await signOut(auth)
            setUser(null)
        } catch (e) {
            console.log(e);
        }
    }

    const deleteAccount = async () => {
        const currentUser = auth.currentUser
        try {
            await deleteDoc(doc(db, "users", currentUser?.uid))
            deleteUser(currentUser)
        } catch (e) {
            console.log(`deleteAccount: ${e}`);
        }
    }

    const signOutAlert = () => {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
                text: 'Sign Out', 
                onPress: signOut,
                style: 'destructive'
            },
          ]);
    }

    const deleteAccountAlert = () => {
        Alert.alert('Delete Account', 'Are you sure you want to delete your account? This action is not reversible', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
                text: 'Delete', 
                onPress: deleteAccount,
                style: 'destructive'
            },
          ]);
        console.log('delete account');
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={[defaultStyles.btn, styles.button, styles.signOut]} onPress={signOutAlert}>
                <Text style={styles.buttonText}>sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.btn, styles.button, styles.delete]} onPress={deleteAccountAlert}>
                <Text style={styles.buttonText}>delete account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    button: {
        width: '90%'
    },
    buttonText: {
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 16
    },
    signOut: {
        backgroundColor: "#1a73e8"
    },
    delete: {
        backgroundColor: "#e64a698d"
    }
})