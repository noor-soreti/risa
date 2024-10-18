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
import { useDispatch, useSelector } from "react-redux";
import { getUserChatLogs } from "@/app/api/features/chatLogs/chatLogThunk";

export default function ChatList() {
    const [newMessage, setNewMessage] = useState(true)
    const [ chats, setChats ] = useState<Array<IChatListItem> | []>([])
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.user)  
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetchData()
    },[])
    
    const fetchData = async () => {
        await dispatch(getUserChatLogs(user.id))
        console.log("");

        // await getUserChats(user.id)
        //     .then(userChats => {
        //         Object.keys(userChats).map(e => {
        //             Object.keys(userChats[e]["users"]).map(u => {
        //                 if (userChats[e]["users"][u]["id"] != user.id) {
        //                     const currentChat: IChatListItem = {
        //                         id: userChats[e]["users"][u]["id"],
        //                         displayName: userChats[e]["users"][u]["fullName"],
        //                         lastMessage: userChats[e]["recentMessage"] || "No messages yet!"
        //                     }
        //                     setChats(prev=>[...prev, currentChat])
        //                 }
        //             })
        //         })
        //     })
    }

    return (
        <View>
            {
                chats.length != 0 ?
                <ChatPreview {...chats} />
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