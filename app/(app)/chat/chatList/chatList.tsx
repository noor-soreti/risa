import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NewMessage from "@/components/NewMessage";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from "@/helperFunction/userStore";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import { getUserChats } from "@/app/api/axiosApiFunctions";
import ChatPreview from "@/components/ChatPreview";

export default function ChatList() {
    const [newMessage, setNewMessage] = useState(true)
    const [ chats, setChats ] = useState([])
    const navigation = useNavigation()
    const { currentUser }: any = useUserStore()     
    
    const fetchData = async () => {
        try {
            const userChatData = await getUserChats()
            Object.entries(userChatData).map(userChat => {
                setChats(prev=>[...prev, userChat[1]])
            })
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    }

    // useEffect(() => {
    //     // get chat user
    //     const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
    //         res.data()?.chats.map( async (e) => {
    //             const userRef = doc(db, 'users', e.receiverId)
    //             const userSnap = await getDoc(userRef)
    //             let userData = userSnap.data()
    //             // console.log(userSnap.data());
    //             userData.chatId = e.chatId
    //             setChats(prev => [...prev, userData])
    //         })
    //     })
    //     return (() => 
    //         unSub()
    //     )
    // }, [])

    return (
        <View>
            {
                chats.length != 0 ?
                Object.keys(chats).map(chat => (
                    <ChatPreview {...{chats, chat}} />
                // <Pressable onPress={() => navigation.navigate('message', {chatId: chats[chat].chatLogId})} style={styles.userInfo} key={chats[chat].chatLogId}>
                //     <Image source={require('../../../../assets/images/profile.png')} style={styles.image} />
                //     <View style={styles.wrapTextContent}>
                //         <View>
                //             <Text style={{fontWeight: 600}}> 
                //                 {
                //                     Object.keys(chats[chat].users).length > 2 
                //                     ?
                //                     <Text>Group Chat:  
                //                         {
                //                             Object.keys(chats[chat]["users"]).map(e => (                                                
                //                                 <Text> {chats[chat]["users"][e]["fullName"]} {e} </Text>
                //                             ))
                //                         } 
                //                     </Text>
                //                     :
                //                     <Text>{chats[chat]["users"][0]["fullName"]}</Text>
                //                 }
                //             </Text>
                //             <Text style={[styles.messageText, newMessage ? styles.newMessage : null ]}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                //         </View>
                //         {
                //             newMessage ?
                //                 <NewMessage newMessage={newMessage} />
                //             :
                //                 null
                //         }
                //     </View>
                // </Pressable>
                ))

            : 
            <View style={styles.noMessage}>
                <Ionicons name="sad-outline" size={50}/>
                {/* <Text>No Chats Yet!</Text> */}

                <Pressable onPress={() => fetchData()}>
                    <Text>Press</Text>
                </Pressable>

            </View>
            }
        </View>
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 250
    }
})