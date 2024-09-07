import { ColorPalette } from "@/constants/Colors";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { Ionicons } from "@expo/vector-icons";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function AddFriend ({setModalVisible, modalVisible}) {
    const { currentUser } = useUserStore()
    const [ search, setSearch ] = useState(null)
    const [ searchUser, setSearchUser ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ warn, setWarn ] = useState(false)

    const handleUserSearch = async () => {
        setLoading(true)
        try {
          const userRef = collection(db, 'users')
          const q = query(userRef, where("displayName", '==', search))
          const querySnapShot = await getDocs(q)
          if (!querySnapShot.empty) {               
            setSearchUser(querySnapShot.docs[0].data());
        } else {
          setSearchUser('User Not Found')
        }
        // setLoading(false)
      } catch (error) {
        console.log(`handleUserSearch: ${error}`);
      }
      setLoading(false)
      }
    
      const handleAddFriend = async () => {
        // if searchedUser NOT in currentUser.friends
        if(!currentUser.friends.includes(searchUser.id)) {
          try {
            const userFriends = currentUser.friends
            userFriends.push(searchUser.id)
            const userRef = doc(db, "users", currentUser.id);
            // Update the "friends" field of the user
            await updateDoc(userRef, {
              friends: userFriends
            });
            Toast.show({
                type: 'success',
                visibilityTime: 5000,
                text1: 'Yay!',
                text2: `You are now friends with ${searchUser.displayName}`
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
      }

    return (
        <View style={styles.centeredView}>
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
                    {searchUser && 
                    <View style={styles.userSearchInfo}>
                        <Text style={{flex: 1, fontSize: 18}}>
                        {searchUser.displayName}
                        </Text>
                    <Pressable onPress={handleAddFriend}>
                        <Ionicons name="add" size={28} />
                    </Pressable>
                    </View>
                }
                    {warn && <Text style={styles.warn}>Hello</Text>}
                    </>
                }
            </View>
            <Toast/>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      blurContainer: {

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
        width: 307,
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
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
      },
      warn: {
        color: 'red',
        fontSize: 16
      }
})