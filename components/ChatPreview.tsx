// import { stompClient } from "@/app/api/websocket/stompClient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import { useSelector } from "react-redux";

export default function ChatPreview() {
    const navigation = useNavigation()
    const { chatLog } = useSelector((state) => state.chatLog)   

    const navigateToMessage = (chat: IChatListItem, names: any) => {
        navigation.navigate('message', {chatId: chat.chatLogId, names})
    }

    if (chatLog.length == 0) {
        return (
            <View style={styles.noMessage}>
                    <Ionicons name="sad-outline" size={50}/>
                    <Text>No Chats Yet!</Text>
            </View>
        )
    }
    
    return (  
        <View>
            {
            Object.keys(chatLog).map(chat => {
                return(
                <Pressable style={styles.userInfo} onPress={() => navigateToMessage(chatLog[chat], chatLog[chat].names)} key={chatLog[chat].chatLogId}>
                    <Image source={require('../assets/images/profile.png')} style={styles.image} />
                    <View style={styles.previewText}>
                        <Text style={styles.previewTextDisplayName}>{chatLog[chat].names}</Text>
                        <Text style={styles.previewTextLastMessage}> {chatLog[chat].recentMessage || "No messages yet"} </Text>
                    </View>
                </Pressable>
                )
            })
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
    previewText: {
        
    },
    previewTextDisplayName: {
        fontWeight: "bold",
        fontSize: 18
    },
    previewTextLastMessage: {
        color: "#9E9E9E",
        fontStyle: 'italic'
    },
    noMessage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 250
    }
})