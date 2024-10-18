import { ColorPalette } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";

export default function ChatPreview(chats: Array<IChatListItem>) {
    const [ fullName, setFullName ] = useState([]); 
    const navigation = useNavigation()

    console.log(chats);
    
    
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

    const navigateToMessage = (contactId: any) => {
        console.log(contactId);
        
        // navigation.navigate('message', {chatId: contactId})
    }
    
    return (  
        <View>
            {
            Object.keys(chats).map(chat => {
                return(
                <Pressable style={styles.userInfo} onPress={() => navigateToMessage(chats)} key={chats[chat].id}>
                    <Image source={require('../assets/images/profile.png')} style={styles.image} />
                    <View style={styles.previewText}>
                        <Text style={styles.previewTextDisplayName}>{chats[chat].displayName}</Text>
                        <Text style={styles.previewTextLastMessage}> {chats[chat].lastMessage} </Text>
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
        color: "#9E9E9E"
    }
})