import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View, Pressable, Image, Button, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { ColorPalette } from "@/constants/Colors";
import { collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";

// 57:50
export default function UserInfo(props: any) {
    const userInfo = props.route.params    
    const [chat, setChat] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const [photos, setPhotos] = useState(false)
    const [files, setFiles] = useState(false)
    const settingsList = ['Chat Settings', 'Privacy & Help', 'Shared Photos', 'Shared Files']
    const navigation = useNavigation()    

    const { currentUser } = useUserStore()

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
      // check if `currentUser` has userChats with selectedUser
      try {
        console.log(userInfo);
      } catch (error) {
        console.log(`handleMessage: ${error}`)
      }
      // const unSub = await setDoc(doc(db, "userChats", currentUser.id), {
      //   name: "Los Angeles",
      //   state: "CA",
      //   country: "USA"
      // });

      // return (() => unSub)
    }

    const handleCall = async () => {
      console.log(currentUser.id);
      console.log(userInfo);
      
      
      try {
        const docRef = doc(db, "userCalls", currentUser.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(`handleMessage: ${error}`)
      }
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
                    <Image source={require('../../../assets/images/avatar.png')} style={styles.image} />
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
                            <Pressable style={styles.settingsOptions} onPress={() => console.log(list)}>
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
        backgroundColor: '#f7f5f5',
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
        backgroundColor: '#7CA4FC',
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