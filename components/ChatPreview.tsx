import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Image } from "react-native";

export default function ChatPreview(props: any) {
    const [ fullName, setFullName ] = useState([]);
    const { chats, chat } = props    

    useEffect(() => {
        const getPreviewInfo = async () => {
            try {
                Object.entries(chats[chat]["users"]).map(e => {
                    const findFullName = [e][0][1]["fullName"]
                    
                    if (fullName.indexOf(findFullName) == -1) {
                        setFullName(prev=>[...prev, findFullName])
                    }
                })
            } catch (error) {
                console.log(`getPreviewInfo: ${error}`);
            }
        }
        getPreviewInfo()
    }, [])
    
    return (
        <Pressable style={styles.userInfo}>
            <Image source={require('../assets/images/profile.png')} style={styles.image} />
            <Text>{fullName.join(', ')}</Text>
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
})