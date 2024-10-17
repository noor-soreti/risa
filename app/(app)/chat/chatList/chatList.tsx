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
import { useSelector } from "react-redux";

export default function ChatList() {
    const [newMessage, setNewMessage] = useState(true)
    const [ chats, setChats ] = useState<Array<IChatListItem> | []>([])
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.user)  
    
    // useEffect(() => {},[])
    
    // useEffect(() => {
    //     const test = async () => {
    //         try {
    //             const userChatData = await getUserChats()
    //             Object.keys(userChatData).map(e => {
    //                 console.log(userChatData[e]);
                    
    //                 // setChats(prev=>[...prev, e[1]])
    //             })
    //         } catch (error) {
    //             console.error("Error fetching user data", error);
    //         }
    //     }
    //     test()
    // }, [])
    
    const fetchData = async () => {
        const userChatData = await getUserChats(user.id)
            .then(userChats => {
                Object.keys(userChats).map(e => {
                    Object.keys(userChats[e]["users"]).map(u => {
                        if (userChats[e]["users"][u]["id"] != user.id) {
                            const currentChat: IChatListItem = {
                                id: userChats[e]["users"][u]["id"],
                                displayName: userChats[e]["users"][u]["fullName"],
                                lastMessage: userChats[e]["recentMessage"] || "No messages yet!"
                            }
                            // console.log(currentChat);
                            setChats(prev=>[...prev, currentChat])
                        }
                    })
                    
                    // Object.keys(userChatData[e]["users"]).map(u => {
                    //     if (userChatData[e]["users"][u]["id"] != user.id) {
                            // const currentChat: IChatListItem = {
                            //     id: userChatData[e]["users"][u]["id"],
                            //     displayName: userChatData[e]["users"][u]["fullName"],
                            //     lastMessage: userChatData[e] || ""
                            // }
                    //         console.log("-------------------------");
                    //         console.log(chats);
                    //         console.log("-------------------------");
        
                            
                    //         // console.log(userChatData[e]["users"][u]["id"]);
                    //         // setChats(prev=>[...prev, currentChat])
                    //     }  
                    // })
                })
                
            })
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
                <ChatPreview {...chats} />
                    
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