import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View, Pressable, Image, Button, SafeAreaView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { ColorPalette } from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { newChatLog } from "@/app/api/axiosApiFunctions";

// 57:50
export default function UserInfo(props: any) {
    const userInfo = props.route.params    
    const [chat, setChat] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const [photos, setPhotos] = useState(false)
    const [files, setFiles] = useState(false)
    const settingsList = ['Chat Settings', 'Privacy & Help', 'Shared Photos', 'Shared Files']
    const navigation = useNavigation()        
    const { user } = useSelector((state) => state.user)

    const toggleState = (key: string) => {
      switch (key.toLowerCase()) {
        case 'chat':
            setChat((prev: any) => !prev);
            break;
        case 'privacy':
            setPrivacy((prev: any) => !prev);
            break;
        case 'photos':
            setPhotos((prev: any) => !prev);
            break;
        case 'files':
            setFiles((prev: any) => !prev);
            break;
        default:
            break;
        }
    }

    const handleMessage = async () => {
      // 1. check if chatLog exists between user and contact
      Object.keys(user.contacts).map(e => {
        if (Object.values(user.contacts[e]).includes(userInfo.id)) {
          navigation.navigate('message', {chatId: userInfo.id})
        }        
      })
      // 2. create new chatLog between user and contact if 
      const idSet = new Set([user.id, userInfo.id])      
      const test = await newChatLog(Array.from(idSet))
      
      

      // const userChats = await getUserChats(currentUser)
      // if (userChats) {        
      //   for (let i = 0; i < userChats.data()?.chats.length; i++) {
      //     if (userChats.data()?.chats[i].receiverId == userInfo.id) {
      //       navigation.navigate('message', {chatId: userChats.data()?.chats[i].chatId})
      //     } 
      //   }
      // } else {
      //   console.log('null');
      // }


    }

    const handleCall = async () => {
     console.log('call');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome name="angle-left" size={20} />
                    </Pressable>
                    <Text style={{fontWeight: 'bold', fontSize: 17}} >Back</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.userInfo}>
                    <Image source={require('../../../assets/images/profile.png')} style={styles.image} />
                    <View style={styles.textInfo}>
                        <Text style={{fontSize: 25, fontWeight: 600}} >{userInfo.displayName}</Text>
                        <Text style={{fontSize: 15}} >Feeling happy</Text>
                    </View>
                </View>

                <View style={styles.userActions}>
                  <Pressable style={styles.userActionsIcon} onPress={handleCall}>
                      <FontAwesome name="phone" size={35} />
                      <Text>Call</Text>
                    </Pressable>
                  <Pressable onPress={handleMessage} style={styles.userActionsIcon}>
                    <FontAwesome name="comments" size={35} />
                    <Text>Message</Text>
                  </Pressable>
                </View>

                <View style={styles.settingsBody}>
                    {
                        settingsList.map((list) => {
                            return(
                            <Pressable style={styles.settingsOptions} onPress={() => console.log(list)} key={list}>
                                <Text style={styles.settingsText} >{list}</Text>
                                <View style={styles.caret}>
                                    <FontAwesome  name="caret-up" size={15} />
                                </View>
                            </Pressable>
                            )
                        })
                    }
                    <Button title="Block User" color={'red'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flex: 1,
        backgroundColor: ColorPalette.lightGrey,
        paddingTop: Platform.OS === "android" ? 30 : 0
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: ColorPalette.borderGrey,
        padding: 15
      }, 
      headerLeft:{
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        gap: 30,
        
      },
      userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      },
      image: {
        width: 100, 
        height: 100, 
        borderRadius: 50,
        cursor: 'pointer'
    },
      textInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      userActions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
      },
      userActionsIcon: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        width: 100,
        alignItems: 'center'
      },
      settingsBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        // padding: 5,
        // backgroundColor: '#f7f4f4',
      },
      settingsOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 350,
        height: 60,
        gap: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20
      },
      settingsText: {
        fontSize: 15
      },
      caret: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 30,
        width: 30,
        borderRadius: 15
      }
      
})