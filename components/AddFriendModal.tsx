import { ColorPalette } from "@/constants/Colors";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function AddFriend ({setModalVisible, modalVisible}: any) {
    const { currentUser }: any = useUserStore()
    const [ search, setSearch ] = useState(null)
    const [ searchUser, setSearchUser ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ warn, setWarn ] = useState(false)

    const { handleFindFriend }: any = useUserStore()


    const handleUserSearch = async () => {
        setLoading(true)
        const querySnapshot = await handleFindFriend(search)
        if (querySnapshot != null) {
          setSearchUser(querySnapshot)
        } else {
          setSearchUser(null)
        }
      setLoading(false)
      }

      const handleCall = async () => {
        const chatRef = collection(db, 'chats')
        const userChatRef = collection(db, 'userChats')
  
        try {
          const newChatRef = doc(chatRef)
          await setDoc(newChatRef, {
            createdAt: serverTimestamp(),
            messages: []
          })
  
          // update user chat
          await updateDoc(doc(userChatRef, searchUser.id), {
            chats: arrayUnion({
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: currentUser.id,
              updatedAt: Date.now()
            })
          })
          await updateDoc(doc(userChatRef, currentUser.id), {
            chats: arrayUnion({
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: searchUser.id,
              updatedAt: Date.now()
            })
          })
          
        } catch (error) {
          console.log(`handleMessage: ${error}`)
        }
      }

      const handleChat = async () => {
        const callRef = collection(db, 'calls')
        const userCallRef = collection(db, 'userCalls')
        try {
          const newCallRef = doc(callRef)
          await setDoc(newCallRef, {
            createdAt: serverTimestamp(),
            messages: []
          })
  
          // update user chat
          await updateDoc(doc(userCallRef, searchUser.id), {
            chats: arrayUnion({
              chatId: newCallRef.id,
              lastMessage: "",
              receiverId: currentUser.id,
              updatedAt: Date.now()
            })
          })
          await updateDoc(doc(userCallRef, currentUser.id), {
            chats: arrayUnion({
              chatId: newCallRef.id,
              lastMessage: "",
              receiverId: searchUser.id,
              updatedAt: Date.now()
            })
          })
        } catch (error) {
          console.log(`handleMessage: ${error}`)
        }
      }
    
      const handleAddFriend = async () => {
        // if searchedUser NOT in currentUser.friends
        if(!currentUser.friends.includes(searchUser.id)) {
          try {
            // add friend to currentUser.friends list and update db
            const userFriends = currentUser.friends
            userFriends.push(searchUser.id)
            const userRef = doc(db, "users", currentUser.id);
            // Update the "friends" field of the user
            await updateDoc(userRef, {
              friends: userFriends
            });
            // add friend to searchUser.id.friends list and update db
            const searchUserRef = doc(db, 'users', searchUser.id)
            const searchUserDocSnap = await getDoc(searchUserRef)
            const searchUserFriends = searchUserDocSnap.data()?.friends
            searchUserFriends.push(currentUser.id)
            await updateDoc(searchUserRef, {
              friends: searchUserFriends
            })

            Toast.show({
                type: 'success',
                visibilityTime: 5000,
                text1: 'Yay!',
                text2: `Friend request sent to ${searchUser.displayName}`
              })
          } catch (error) {
            console.log(`handleAddUser: ${error}`);  
          }
        } else {
          console.log(`handleAddUser: Already friends with ${searchUser.displayName}`);
          Toast.show({
            type: 'error',
            visibilityTime: 5000,
            text1: 'Whoops',
            text2: `Seems like you are already friends with ${searchUser.displayName}`
          })
        }
        handleCall()
        handleChat()
      }

    return (
        <BlurView intensity={5} style={styles.centeredView}>
            <View style={styles.modalView}>
                <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 5}} onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons name="close-outline" size={28} />
                </TouchableOpacity>
                <Text style={styles.modalText}>Look for Friends</Text>
                <View style={styles.modalSearch}>
                <TextInput style={styles.input} value={search} onChangeText={setSearch} placeholder="Search for users" autoCapitalize="words"/>
                <Pressable
                    style={styles.button}
                    onPress={handleUserSearch}>
                    <Ionicons name="search" size={20} color={'white'}/>
                </Pressable>
                </View>
                {
                loading ?
                    <ActivityIndicator size={20} color={'blue'}/>
                : 
                    <>
                    {searchUser ? 
                      <View style={styles.userSearchInfo}>
                          <Text style={{flex: 1, fontSize: 18}}>
                          {searchUser.displayName}
                          </Text>
                      <Pressable onPress={handleAddFriend}>
                          <Ionicons name="add" size={28} />
                      </Pressable>
                      </View>
                    :
                      <Text>User not found</Text>
                    }
                    {warn && <Text style={styles.warn}>Hello</Text>}
                    </>
                }
            </View>
            <Toast/>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },    
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        justifyContent: 'center',
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
      },
      modalSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      input: {
        borderRadius: 10,
        height: 40,
        width: 300,
        marginBottom: 10,
        padding: 10,
        borderColor: '#e7e7e7',
        color: '#7b8d93',
        borderWidth: 1,
      }, 
      userSearchInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: ColorPalette.borderGrey,
        borderWidth: 1,
        padding: 5
      },
      warn: {
        color: 'red',
        fontSize: 16
      }
})