import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import NewMessage from "@/components/NewMessage";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import ChatPreview from "@/components/ChatPreview";
import { useDispatch, useSelector } from "react-redux";
import { getUserChatLogs } from "@/app/api/features/chatLogs/chatLogThunk";

export default function ChatList() {
    const [newMessage, setNewMessage] = useState(true)
    const [ chats, setChats ] = useState<Array<IChatListItem> | []>([])
    const { chatLog, loading } = useSelector((state) => state.chatLog)  
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()    
    
    useEffect(() => {    
        const populateChats = async () => {
            await dispatch(getUserChatLogs(user.id))
        }
        populateChats()
    },[])

    if (loading) {
        return (
            <ActivityIndicator size={30} color={'blue'} style={{flex: 1, alignContent: 'center'}} />
        )
    } 
    
    if (chatLog != null) {
        return (
            <ChatPreview />
        )
    } else {
        <View style={styles.noMessage}>
                    <Ionicons name="sad-outline" size={50}/>
                    <Text>No Chats Yet!</Text>

                    {/* <Pressable onPress={() => fetchData()}>
                        <Text>Press</Text>
                    </Pressable> */}

                </View>
    }

    // return (
    //     <View>
    //         {
    //             chatLog != null ?
    //             <ChatPreview />
    //         : 
    //             <View style={styles.noMessage}>
    //                 <Ionicons name="sad-outline" size={50}/>
    //                 <Text>No Chats Yet!</Text>

    //                 {/* <Pressable onPress={() => fetchData()}>
    //                     <Text>Press</Text>
    //                 </Pressable> */}

    //             </View>
    //             }
    //     </View>
    // )
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