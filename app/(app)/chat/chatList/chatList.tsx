import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NewMessage from "@/components/NewMessage";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from "@/helperFunction/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export default function ChatList() {
    const [newMessage, setNewMessage] = useState(true)
    const navigation = useNavigation()
    const { currentUser } = useUserStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
            const items = res.data()?.chats
            console.log(items)
        })
        return (() => 
            unSub()
        )
        
    }, [])
    

    const onLinkPress = (screenName: string) => {
        navigation.navigate(screenName)
    }

    return (
        <Pressable onPress={() => onLinkPress('message')} style={styles.userInfo}>
            <Image source={require('../../../../assets/images/avatar.png')} style={styles.image} />
            <View style={styles.wrapTextContent}>
                <View>
                    <Text style={{fontWeight: 600}}>Emily Grant</Text>
                    <Text style={[styles.messageText, newMessage ? styles.newMessage : null ]}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </View>
                {
                    newMessage ?
                        <NewMessage newMessage={newMessage} />
                    :
                        null
                }
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginRight: 10,
        marginLeft: 15,
        alignItems: 'center'
    },
    image: {
        width: 60, 
        height: 60, 
        backgroundColor: '#7CA4FC',
        borderRadius: 30,
        cursor: 'pointer'
    },
    wrapTextContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        marginLeft: 10,
    },
    messageText: {
        fontWeight: 300
    },
    newMessage: {
        color: '#626262'
    },
    noMessage: {

    }
})