import { ColorPalette } from "@/constants/Colors";
import { db } from "@/firebase";
import { useUserStore } from "@/helperFunction/userStore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FriendsDropdown (props: any) {
    const [contacts, setContacts] = useState<any>([])
    const { navigation } = props
    const { currentUser } = useUserStore()

    useEffect(() => {  
        const fetchFriends = async () => {
          const friendsPromises = currentUser.friends.map((friendId: string) => 
            getDoc(doc(db, "users", friendId))
          );
          const friendsDocs = await Promise.all(friendsPromises);
          const friendsData = friendsDocs.map((doc) => doc.data());
          setContacts(friendsData);
        }
  
        fetchFriends()      
      }, [contacts]);
    
    return (
        <ScrollView >
            {
            contacts.length <= 0 ?
                <Pressable onPress={() => console.log("press me")}>
                    <Text>No Friends Yet!</Text>
                </Pressable>
            : 
                Object.keys(contacts).map(contact => (
                    <Pressable onPress={() => navigation.navigate('userInfo', contacts[contact])} style={styles.contact} key={contacts[contact]['name']}>
                    {/* <Image style={styles.image} source={require('../../assets/images/avatar.png')} /> */}
                    <View>
                        <Text>
                        {contacts[contact]['displayName']}
                        </Text>
                    </View>
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
        padding: 10,
        borderBottomWidth: 1,
        borderBlockColor: ColorPalette.borderGrey,
      },
})