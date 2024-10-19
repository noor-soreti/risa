import { ColorPalette } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import { useSelector } from "react-redux";

export default function ChatPreview() {
    const navigation = useNavigation()
    const { chatLog } = useSelector((state) => state.chatLog)

    // useEffect(() => {
    //     const getPreviewInfo = async () => {
    //         try {
    //             Object.entries(chats[chat]["users"]).map(e => {
    //                 const findFullName = [e][0][1]["displayName"]
                    
    //                 if (fullName.indexOf(findFullName) == -1) {
    //                     setFullName(prev=>[...prev, findFullName])
    //                 }
    //             })
    //         } catch (error) {
    //             console.log(`getPreviewInfo: ${error}`);
    //         }
    //     }
    //     getPreviewInfo()
    // }, [])

    const navigateToMessage = (chat: IChatListItem) => {
        console.log(chat.chatLogId);
        navigation.navigate('message', {chatId: chat.chatLogId})
    }
    
    return (  
        <View>
            {
            Object.keys(chatLog).map(chat => {
                return(
                    // <Text>
                    //     {chatLog[chat].id}
                    // </Text>
                <Pressable style={styles.userInfo} onPress={() => navigateToMessage(chatLog[chat])} key={chatLog[chat].chatLogId}>
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
    }
})