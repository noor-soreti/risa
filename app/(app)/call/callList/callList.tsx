// import { CustomSwitch } from "@/components/CustomSwitch";
// import { ToggleButton } from "@/components/ToggleButton";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Animated, TouchableOpacity } from "react-native";

export default function CallList() {  
    const { currentUser }: any = useUserStore()
    const [ calls, setCalls ] = useState([])
    const username = 'Jane Doe'

    const getCalls = async () => {
        try {
            const docRef = doc(db, "userChats", currentUser.id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setCalls(docSnap.data())
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
        } catch (error) {
            console.log(`callList error: ${error}`);
        }
    }

    useEffect(() => {
        getCalls()
        console.log(calls);
        
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.toggleContainer}>
            </View>

            {/* change to ListView */}
            <View style={styles.callList}>
                <Pressable onPress={() => console.log(`calling ${username}`)} style={styles.callItem}>
                    <View style={styles.callerInfo}>
                        <Image source={require('../../../../assets/images/avatar.png')} style={styles.image} />
                        <Text style={{marginLeft: 15, fontWeight: 600}}>Jane Doe</Text>
                    </View>
                    <View style={styles.callInfo}>
                        <Text>Today</Text>
                        <Text style={{color: 'red'}} >Incomming</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 15,
        gap: 15
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      },
    callList: {
        display: 'flex',
        // padding: 5,
        gap: 6,
    },
    callItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#f7f4f4',
        borderRadius: 10,
        borderColor: 'white'
    }, 
    callerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    callInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    }, 
    image: {
        width: 40, 
        height: 40, 
        backgroundColor: '#7CA4FC',
        borderRadius: 30,
        cursor: 'pointer'
    },
})