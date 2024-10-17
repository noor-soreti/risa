import { ColorPalette } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";

export default function ChatPreview(chats: Array<IChatListItem>) {
    const [ fullName, setFullName ] = useState([]); 
    
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
    
    return (  
        <Pressable style={styles.userInfo}>
            <Image source={require('../assets/images/profile.png')} style={styles.image} />
            <View style={styles.previewText}>
                <Text style={styles.previewTextDisplayName}>{chats[0].displayName}</Text>
                <Text style={styles.previewTextLastMessage}> {chats[0].lastMessage} </Text>
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