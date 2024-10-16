import { addContact, searchUserByPhoneNumber } from "@/app/api/axiosApiFunctions";
import { ColorPalette } from "@/constants/Colors";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function AddFriend ({setModalVisible, modalVisible}: any) {
    const [ search, setSearch ] = useState('555-123-1234')
    const [ searchUser, setSearchUser ] = useState<ISearchContact | null>(null)
    // const [ loading, setLoading ] = useState(false)
    const [ warn, setWarn ] = useState(false)
    const { user, loading, error } = useSelector((state)=> state.user)

    console.log(searchUser);
    
    const handleUserSearch = async () => {
      // setLoading(true)
      const searchContact = await searchUserByPhoneNumber(search)
      setSearchUser(searchContact)
      // setLoading(false)
      }
    
      const handleAddFriend = async () => {        
        const addFriend = await addContact(user.id, searchUser.id)
        console.log(addFriend);
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
                          <Text style={{flex: 1, fontSize: 18}}> {searchUser.fullName} </Text>
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