import { ColorPalette } from "@/constants/Colors";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FriendsDropdown (props: any) {
    const [contacts, setContacts] = useState<any>([])
    const { navigation } = props
    const { currentUser }: any = useUserStore()    

    // useEffect(() => {  
    //     const fetchFriends = async () => {
    //       const friendsPromises = currentUser.friends.map((friendId: string) => 
    //         getDoc(doc(db, "users", friendId))
    //       );
    //       const friendsDocs = await Promise.all(friendsPromises);
    //       const friendsData = friendsDocs.map((doc) => doc.data());
    //       setContacts(friendsData);
    //     }
  
    //     fetchFriends()      
    //   }, [contacts]);
    
    return (
        <ScrollView>
            {
            contacts.length <= 0 ?
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Ionicons name="sad-outline" size={50}/>
                    <Text>No Friends Yet!</Text>
                </View>
            : 
                Object.keys(contacts).map(contact => (
                    <Pressable onPress={() => navigation.navigate('userInfo', contacts[contact])} style={styles.contact} key={contacts[contact]['id']}>
                        <View style={styles.friendInfo}>
                            <Image style={styles.image} source={require('../assets/images/profile.png')} />
                            <Text>
                            {contacts[contact]['displayName']}
                            </Text>
                        </View>
                        <Text style={styles.statusText}>Available</Text>
                    </Pressable>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBlockColor: ColorPalette.borderGrey,
      },
      friendList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      friendInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
      },
      image: {
        width: 35, 
        height: 35, 
        borderRadius: 30,
      },
      statusText: {
        color: '#7b7b92'
      }
})